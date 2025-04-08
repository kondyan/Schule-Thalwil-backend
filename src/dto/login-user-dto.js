const Joi = require("joi");

const loginUserDto = Joi.object({
  password: Joi.string().pattern(
    // new RegExp("^[a-zA-Z0-9@$!%*#?&]{6,30}$")
    /^.{8,}$/
    // Minimum 8 characters
  ),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = { loginUserDto };
