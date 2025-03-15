const Joi = require("joi");

const createCategoryDto = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zöäü]+$/)
    .min(2)
    .max(20),
});

module.exports = { createCategoryDto };
