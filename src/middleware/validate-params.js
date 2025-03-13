const { httpError } = require("../util/http-error");

const validateParamas = (schema) => {
  const func = (req, resp, next) => {
    const { value, error } = schema.validate(req.params);
    if (error) {
      next(httpError(400, error.message));
    }
    req.params = { ...req.params, ...value };
    next();
  };

  return func;
};

module.exports = { validateParamas };
