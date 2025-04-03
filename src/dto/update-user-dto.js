const Joi = require("joi");

const updateUserDto = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),

  name: Joi.string().alphanum().min(3).max(20),

  secondName: Joi.string().alphanum().min(3).max(20),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@$!%*#?&]{6,30}$")),
});

module.exports = { updateUserDto };
