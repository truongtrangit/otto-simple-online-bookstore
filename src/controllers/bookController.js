module.exports = {
  getBooks: async (req, res) => {
    const {
      Models: { Book },
    } = global;
    const { page = 0, limit = 100 } = req.query;

    const total = await Book.countDocuments();
    const books = await Book.find()
      .skip(page * limit)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    return res.success(
      {
        data: books,
        total,
      },
      201
    );
  },
  getBook: async (req, res) => {
    const {
      Models: { Book },
    } = global;
    const book = await Book.findById(req.params.id);
    res.json(book);
  },
  createBook: async (req, res) => {
    const {
      Models: { Book },
    } = global;
    const book = await Book.create(req.body);
    res.json(book);
  },
  updateBook: async (req, res) => {
    const {
      Models: { Book },
    } = global;
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(book);
  },
  deleteBook: async (req, res) => {
    const {
      Models: { Book },
    } = global;
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json(book);
  },
};
