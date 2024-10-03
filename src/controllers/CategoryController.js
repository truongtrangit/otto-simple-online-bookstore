const getPaginationParams = require('../utils/queryParams');
const Validator = require('../validators/CategoryValidator');
const ApiError = require('../utils/apiError');

module.exports = {
  getCategories: async (req, res, next) => {
    try {
      const {
        Models: { Category },
      } = global;
      const { page, limit } = getPaginationParams(req);

      const total = await Category.countDocuments();
      const categories = await Category.find()
        .skip(page * limit)
        .limit(limit)
        .sort({ _id: -1 })
        .lean();

      return res.success({
        categories,
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
  createCategory: async (req, res, next) => {
    try {
      const {
        Models: { Category },
      } = global;
      const error = Validator.validateCreateCategoryRequest(req.body);
      if (error) {
        return res.badRequest(`Invalid Param, ${error.details[0].message}`);
      }
      const { name } = req.body;

      const category = await Category.create({ name });
      return res.success({ category }, 201);
    } catch (error) {
      next(new ApiError(error?.code || 500, error?.message));
    }
  },
};
