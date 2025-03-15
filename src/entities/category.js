const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Category = model("categories", categorySchema);

module.exports = { Category };
