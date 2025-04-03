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
  const { id, username, name, secondName, email, avatar, role } = req.user;

  resp.json({ id, username, name, secondName, email, avatar, role });
};

const addUser = async (req, resp, next) => {
  const { username, name, secondName, email, password } = req.body;

  const newUser = await userService.addUser(
    username,
    name,
    secondName,
    email,
    password
  );
  resp.status(201).json(newUser);
};

const updateUser = async (req, resp, next) => {
  const { _id } = req.user;
  const updatedUser = await userService.updateUser(_id, req.body);
  resp.json(updatedUser);
};

const updateAvatar = async (req, resp, next) => {
  const avatar = req.avatarUrl;
  const _id = req.user._id;

  const updatedUser = await userService.updateAvatar(_id, avatar);
  resp.json(updatedUser);
};

const setRole = async (req, resp, next) => {
  const { _id } = req.params;
  const { role } = req.body;

  const updatedUser = await userService.updateUser(_id, { role });
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
  setRole: ctrlWrapper(setRole),
  deleteUser: ctrlWrapper(deleteUser),
};
