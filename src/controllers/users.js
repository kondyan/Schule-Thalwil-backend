const userService = require("../services/users");
const ctrlWrapper = require("../util/ctrl-wrapper");
const { saveFileToCloudinary } = require("../util/saveFileToCloudinary");

const getUsers = async (req, resp, next) => {
  const users = await userService.getUsers();
  resp.json(users);
};

const getUserById = async (req, resp, next) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);
  resp.json(user);
};

const getCurrentUser = (req, resp, next) => {
  const { id, username, email, photo } = req.user;

  resp.json({ id, username, email, photo });
};

const addUser = async (req, resp, next) => {
  const { username, email, password } = req.body;

  const newUser = await userService.addUser(username, email, password);
  resp.status(201).json(newUser);
};

const updateAvatar = async (req, resp, next) => {
  const avatar = req.avatarUrl;
  const id = req.id;

  const updatedUser = await userService.updateAvatar(id, avatar);
  resp.status(200).json(updatedUser);
};

const deleteUser = async (req, resp, next) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  resp.status(204).json();
};

module.exports = {
  getUsers: ctrlWrapper(getUsers),
  getUserById: ctrlWrapper(getUserById),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  addUser: ctrlWrapper(addUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  deleteUser: ctrlWrapper(deleteUser),
};
