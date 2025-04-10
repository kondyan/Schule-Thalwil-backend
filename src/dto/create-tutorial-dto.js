const Joi = require("joi");

const createTutorialDto = Joi.object({
  category: Joi.required(),
  title: Joi.string()
    .pattern(/^[A-Za-zäöüÄÖÜß0-9\s.,:;?!-–«»""''@#$%^&*“”‘’()\[\]-\s+]+$/)
    .min(2)
    .max(27),
  videoUrl: Joi.string(),
  description: Joi.string()
    .pattern(/^[A-Za-zäöüÄÖÜß0-9\s.,:;?!-–«»""''@#$%^&*“”‘’()\[\]-\s+]+$/)
    .min(10)
    .max(200),
  isDraft: Joi.bool(),
});

module.exports = { createTutorialDto };
