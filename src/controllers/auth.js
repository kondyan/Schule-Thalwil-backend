const authService = require("../services/auth");
const ctrlWrapper = require("../util/ctrl-wrapper");
const { saveFileToCloudinary } = require("../util/saveFileToCloudinary");

const register = async (req, resp, next) => {
  const { username, name, secondName, email, password } = req.body;

  const newUser = await authService.register(
    username,
    name,
    secondName,
    email,
    password
  );
  resp.status(201).json(newUser);
};

const login = async (req, resp, next) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);
  resp.json(user);
};

const logout = async (req, resp, next) => {
  resp.status(204).send();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
