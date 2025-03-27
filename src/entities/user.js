const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    secondName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("users", userSchema);

module.exports = { User };
