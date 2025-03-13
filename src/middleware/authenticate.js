const { httpError } = require("../util/http-error");
const jwt = require("jsonwebtoken");
const userService = require("../services/users");

const authenticate = async (req, resp, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(httpError(401));
  }

  try {
    const { email } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userService.getUserByEmail(email);
    if (!user) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(httpError(401));
  }
};

module.exports = { authenticate };
