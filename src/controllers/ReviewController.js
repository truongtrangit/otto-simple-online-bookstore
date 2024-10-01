const Validator = require('../validators/ReviewValidator');

module.exports = {
  createReview: async (req, res) => {
    try {
      const {
        Models: { Review, Book },
      } = global;
      const error = Validator.validateCreateReviewRequest(req.body);
      if (error) {
        return res.badRequest(`Invalid Param, ${error.details[0].message}`);
      }

      const book = await Book.exists({ _id: req.body.bookId });
      if (!book) {
        return res.notFound('Book not found');
      }

      const review = await Review.create(req.body);
      await Book.updateOne(
        { _id: req.body.bookId },
        { $push: { reviews: review._id } }
      );
      return res.success({ review }, 201);
    } catch (error) {
      console.error('===== Error in createReview', error);
      return res.internalError(error);
    }
  },
};
