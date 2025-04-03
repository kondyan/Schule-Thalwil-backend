const Joi = require("joi");

const setRoleDto = Joi.object({
  role: Joi.array()
    .items(Joi.string().valid("writer", "moderator", "admin"))
    .required(),
});

module.exports = { setRoleDto };
