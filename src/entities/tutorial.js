const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isDraft: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tutorial = model("tutorials", tutorialSchema);

module.exports = { Tutorial };
