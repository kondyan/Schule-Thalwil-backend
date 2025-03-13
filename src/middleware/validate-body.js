const { httpError } = require("../util/http-error");

const validateBody = (schema) => {
  const func = (req, resp, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    req.body = { ...req.body, ...value };
    next();
  };

  return func;
};

module.exports = { validateBody };
