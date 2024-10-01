const getPaginationParams = require('../utils/queryParams');
const Validator = require('../validators/CategoryValidator');

module.exports = {
  getCategories: async (req, res) => {
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
      console.error('===== Error in getCategories', error);
      return res.internalError(error);
    }
  },
  createCategory: async (req, res) => {
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
      console.error('===== Error in createCategory', error);
      return res.internalError(error);
    }
  },
};
