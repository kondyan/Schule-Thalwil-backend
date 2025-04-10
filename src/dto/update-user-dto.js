const Joi = require("joi");

const updateUserDto = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),

  name: Joi.string().alphanum().min(3).max(20),

  secondName: Joi.string().alphanum().min(3).max(20),

  password: Joi.when("password", { is: Joi.exist(), then: Joi.string().min(8) })
    .string()
    .min(8),

  role: Joi.array().items(Joi.string().valid("writer", "moderator", "admin")),
  // .required(),
});

module.exports = { updateUserDto };
