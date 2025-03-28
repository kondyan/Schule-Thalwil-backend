const Joi = require("joi");

const createPostDto = Joi.object({
  title: Joi.string()
    .pattern(/^[A-Za-zöäüÖÄÜ0-9 -().,;:<>""«»?!–]+$/)
    .min(2)
    .max(27),
  imageUrl: Joi.string(),
  content: Joi.string()
    .pattern(/^[A-Za-zöäüÖÄÜ0-9 -().,;:<>""«»?!–]+$/)
    .min(40)
    .max(1000),
  isDraft: Joi.bool(),
});

module.exports = { createPostDto };
