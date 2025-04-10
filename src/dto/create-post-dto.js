const Joi = require("joi");

const createPostDto = Joi.object({
  title: Joi.string()
    .pattern(/^[A-Za-zäöüÄÖÜß0-9\s.,:;?!–«»-""''@#$%^&*“”‘’()\[\]-\s+]+$/)
    .min(2)
    .max(27),
  imageUrl: Joi.string(),
  content: Joi.string()
    .pattern(/^[A-Za-zäöüÄÖÜß0-9\s.,:;?!–«»-""''@#$%^&*“”‘’()\[\]-\s+]+$/)
    .min(40)
    .max(1500),
  isDraft: Joi.bool(),
});

module.exports = { createPostDto };
