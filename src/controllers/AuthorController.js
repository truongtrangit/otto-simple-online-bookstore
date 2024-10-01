const getPaginationParams = require('../utils/queryParams');
const Validator = require('../validators/AuthorValidator');

module.exports = {
  getAuthors: async (req, res) => {
    try {
      const {
        Models: { Author },
      } = global;
      const { page, limit } = getPaginationParams(req);

      const total = await Author.countDocuments();
      const authors = await Author.find()
        .skip(page * limit)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

      return res.success({
        authors,
        paging: {
          page,
          limit,
          total,
        },
      });
    } catch (error) {
      console.error('===== Error in getAuthors', error);
      return res.internalError(error);
    }
  },
  createAuthor: async (req, res) => {
    try {
      const {
        Models: { Author },
      } = global;
      const error = Validator.validateCreateAuthorRequest(req.body);
      if (error) {
        return res.badRequest(`Invalid Param, ${error.details[0].message}`);
      }
      const author = await Author.create(req.body);
      return res.success({ author });
    } catch (error) {
      console.error('===== Error in createAuthor', error);
      return res.internalError(error);
    }
  },
};
