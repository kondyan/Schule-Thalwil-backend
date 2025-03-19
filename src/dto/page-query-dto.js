const Joi = require("joi");

const pageQueryDto = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
});

module.exports = { pageQueryDto };
