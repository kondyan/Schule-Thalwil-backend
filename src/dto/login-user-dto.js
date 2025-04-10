const Joi = require("joi");

const loginUserDto = Joi.object({
  password: Joi.string().min(8),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = { loginUserDto };
