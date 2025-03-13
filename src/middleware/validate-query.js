const { httpError } = require("../util/http-error");

const validateQuery = (schema) => {
  const func = (req, resp, next) => {
    const { value, error } = schema.validate(req.query);
    if (error) {
      next(httpError(400, error.message));
    }
    req.query = { ...req.query, ...value };
    next();
  };

  return func;
};

module.exports = { validateQuery };
