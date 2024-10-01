function getPaginationParams(req) {
  try {
    const { page = 0, limit = 100 } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || isNaN(parsedLimit)) {
      throw new Error('Invalid pagination parameters');
    }

    return { page: parsedPage, limit: parsedLimit };
  } catch (error) {
    console.error(error);
    return { page: 0, limit: 100 };
  }
}

module.exports = getPaginationParams;
