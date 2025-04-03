const { Schema, model } = require("mongoose");

const roles = ["writer", "moderator", "admin"];

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    secondName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, required: false },
    role: {
      type: [{ type: String, enum: roles }],
      default: [],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("users", userSchema);

module.exports = { User };
