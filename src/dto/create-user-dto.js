const Joi = require("joi");

const createUserDto = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  name: Joi.string().alphanum().min(3).max(20).required(),

  secondName: Joi.string().alphanum().min(3).max(20),

  password: Joi.string().min(8),

  email: Joi.string().email({
    minDomainSegments: 2,
    // tlds: { allow: ["com", "net"] },
  }),
});

module.exports = { createUserDto };
