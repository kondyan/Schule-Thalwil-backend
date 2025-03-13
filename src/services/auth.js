const bcrypt = require("bcrypt");
const userService = require("./users");
const jwt = require("jsonwebtoken");
const { httpError } = require("../util/http-error");

const register = async (username, email, password) => {
  const user = await userService.addUser(username, email, password);
  const payload = { email };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
  return { user, token };
};

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401);
  }
  const payload = { email };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
  delete user.password;
  return { user, token };
};

module.exports = { register, login };
