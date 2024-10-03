const { isValidObjectId } = require('mongoose');
const Validator = require('../validators/BookValidator');
const getPaginationParams = require('../utils/queryParams');
const { isValidISBN, formatISBN } = require('../utils/checkISBN');
const ApiError = require('../utils/apiError');

module.exports = {
  getBooks: async (req, res, next) => {
    try {
      const {
        Models: { Book },
        configs: { runtime },
      } = global;
      const { page, limit } = getPaginationParams(req);
      const { id, title, isbn, startPrice, endPrice, authorId, categoryId } =
        req.query;

      // Build the query condition based on the provided parameters
      const queryCondition = {
        ...(id && { _id: id }),
        ...(title && { $text: { $search: title } }),
        ...(isbn && { isbn: { $regex: formatISBN(isbn), $options: 'i' } }),
        ...(startPrice && {
          $or: [
            { price: { $gte: startPrice } },
            { discountedPrice: { $gte: startPrice } },
          ],
        }),
        ...(endPrice && {
          $or: [
            { price: { $lte: endPrice } },
            { discountedPrice: { $lte: endPrice } },
          ],
        }),
        ...(authorId && { author: authorId }),
        ...(categoryId && { category: categoryId }),
      };

      // Ensure price range is handled correctly
      if (startPrice && endPrice) {
        queryCondition['$or'] = [
          { price: { $gte: startPrice, $lte: endPrice } },
          { discountedPrice: { $gte: startPrice, $lte: endPrice } },
        ];
      }

      const total = await Book.countDocuments(queryCondition);
      const books = await Book.find(queryCondition)
        .skip(page * limit)
        .limit(limit)
        .sort({ _id: -1 })
        .populate('author', 'name')
        .populate('category', 'name')
        .lean();

      return res.success({
        books,
        paging: {
          page,
          limit,
          total,
        },
      });
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
  getBook: async (req, res, next) => {
    try {
      const {
        Models: { Book },
      } = global;
      // Check query by id or isbn
      const queryCondition = isValidObjectId(req.params.id)
        ? { _id: req.params.id }
        : { isbn: formatISBN(req.params.id) };

      const book = await Book.findOne(queryCondition)
        .populate('category', 'name')
        .populate('author', 'name')
        .populate('reviews', 'name reviewer content')
        .lean();

      return res.success({ book: book ?? {} });
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
  createBook: async (req, res, next) => {
    try {
      const {
        Models: { Book, Author, Category },
        configs: { runtime },
      } = global;
      const error = Validator.validateCreateBookRequest(req.body);
      if (error) {
        return res.badRequest(`Invalid Param, ${error.details[0].message}`);
      }

      const { authorId, categoryId, isbn, discountPercent } = req.body;

      const isExistAuthor = await Author.exists({ _id: authorId });
      if (!isExistAuthor) {
        return res.notFound('Author not found');
      }
      const isExistCategory = await Category.exists({ _id: categoryId });
      if (!isExistCategory) {
        return res.notFound('Category not found');
      }

      const checkValidISBN = isValidISBN(isbn);
      if (!checkValidISBN) {
        return res.badRequest('Invalid ISBN');
      }

      // Get isbn after check valid to check if it existed in DB
      // Make sure isbn in db just contain number without hyphen and space
      const isExistIsbn = await Book.exists({ isbn: checkValidISBN.isbn });
      if (isExistIsbn) {
        return res.badRequest('Book with ISBN already used');
      }

      const {
        bookConfig: { currentVersion, versionApplyDiscount },
      } = runtime;
      const isApplyDiscount =
        currentVersion === versionApplyDiscount && discountPercent;

      const book = await Book.create({
        ...req.body,
        author: authorId,
        category: categoryId,
        isbn: checkValidISBN.isbn,
        schemaVersion: currentVersion,
        discountPercent: isApplyDiscount ? discountPercent : 0,
      });
      return res.success({ book }, 201);
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
  updateBook: async (req, res, next) => {
    try {
      const {
        Models: { Book, Author, Category },
        configs: { runtime },
      } = global;
      const error = Validator.validateUpdateBookRequest(req.body);
      if (error) {
        return res.badRequest(`Invalid Param, ${error.details[0].message}`);
      }

      // Check query by id or isbn
      const queryCondition = isValidObjectId(req.params.id)
        ? { _id: req.params.id }
        : { isbn: formatISBN(req.params.id) };

      const isExistBook = await Book.findOne(queryCondition).lean();
      if (!isExistBook) {
        return res.notFound('Book not found');
      }

      const updateData = { ...req.body };
      delete updateData.discountPercent;
      delete updateData.schemaVersion;

      const { price, authorId, categoryId, discountPercent, schemaVersion } =
        req.body;
      // Check if authorId or categoryId changed
      if (authorId && authorId !== isExistBook.author.toString()) {
        const isExistAuthor = await Author.exists({ _id: authorId });
        if (!isExistAuthor) {
          return res.notFound('Author not found');
        }
        updateData.author = authorId;
      }

      if (categoryId && categoryId !== isExistBook.category.toString()) {
        const isExistCategory = await Category.exists({ _id: categoryId });
        if (!isExistCategory) {
          return res.notFound('Category not found');
        }
        updateData.category = categoryId;
      }

      const {
        bookConfig: { versionApplyDiscount },
      } = runtime;
      //  Check if can apply discount and update discountPercent
      if (
        (isExistBook.schemaVersion === versionApplyDiscount ||
          schemaVersion === versionApplyDiscount) &&
        discountPercent
      ) {
        const currentPrice = price || isExistBook.price;
        updateData.discountPercent = discountPercent;
        updateData.discountedPrice =
          currentPrice - (currentPrice * discountPercent) / 100;
      }

      const book = await Book.findOneAndUpdate(queryCondition, updateData, {
        new: true,
      });
      return res.success({ book });
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
  deleteBook: async (req, res) => {
    try {
      const {
        Models: { Book },
      } = global;
      // Check query by id or isbn
      const queryCondition = isValidObjectId(req.params.id)
        ? { _id: req.params.id }
        : { isbn: formatISBN(req.params.id) };

      const isExistBook = await Book.exists(queryCondition);
      if (!isExistBook) {
        return res.notFound('Book not found');
      }

      await Book.findOneAndDelete(queryCondition);
      return res.success({}, 204);
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
};
