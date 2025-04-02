const bcrypt = require("bcrypt");
const { httpError } = require("../util/http-error");
const { User } = require("../entities/user");

const getUsers = async () => {
  return User.find();
};

const getUserById = async (searchedId) => {
  const user = await User.findById(searchedId);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw httpError(401);
  }
  return user;
};

const addUser = async (username, name, secondName, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = (
    await User.create({
      username,
      name,
      secondName,
      email,
      password: encryptedPassword,
    })
  ).toObject();

  delete newUser.password;
  return newUser;
};

const updateUser = async (_id, username, name, secondName, password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(
    _id,
    { username, name, secondName, password: encryptedPassword },
    {
      new: true,
    }
  ).toObject();

  delete newUser.password;
  return user;
};

const updateAvatar = async (_id, avatar) => {
  const user = await User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
    }
  );

  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw httpError(404, "User is not found");
  }
  await User.findByIdAndDelete(id);
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  updateAvatar,
  getUserByEmail,
  deleteUser,
};
