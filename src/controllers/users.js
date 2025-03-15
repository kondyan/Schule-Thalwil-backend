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

const updateUser = async (req, resp, next) => {
  const { _id } = req.user;
  const { username } = req.body;
  const updatedUser = await userService.updateUser(_id, username);
  resp.json(updatedUser);
};

const updateAvatar = async (req, resp, next) => {
  const avatar = req.avatarUrl;
  const _id = req.user._id;

  const updatedUser = await userService.updateAvatar(_id, avatar);
  resp.json(updatedUser);
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
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  deleteUser: ctrlWrapper(deleteUser),
};
