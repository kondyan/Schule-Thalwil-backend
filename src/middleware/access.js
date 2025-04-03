const { httpError } = require("../util/http-error");

const access = (roleName) => {
  const func = (req, resp, next) => {
    const { role } = req.user;

    // if (role.includes("admin")) {
    //   next();
    // }

    if (!role.includes(roleName)) {
      next(httpError(403));
    }
    next();
  };

  return func;
};

module.exports = { access };
