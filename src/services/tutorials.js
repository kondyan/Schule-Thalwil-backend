const { httpError } = require("../util/http-error");
const { Tutorial } = require("../entities/tutorial");
const { Category } = require("../entities/category");

const getTutorials = async () => {
  return Tutorial.find();
};

const createTutorial = async (
  categoryId,
  title,
  description,
  videoUrl,
  _id,
  isDraft
) => {
  const category = Category.findById(categoryId);
  if (!category) {
    throw httpError(404, "Category is not found");
  }
  const newTutorial = await Tutorial.create({
    categoryId,
    title,
    description,
    videoUrl,
    author: _id,
    isDraft,
  });

  return newTutorial;
};

const updateTutorial = async (id, title, description, videoUrl, isDraft) => {
  const tutorial = await Tutorial.findByIdAndUpdate(
    id,
    { title, description, videoUrl, isDraft },
    {
      new: true,
    }
  );
  if (!tutorial) {
    throw httpError(404, "Tutorial is not found");
  }

  return tutorial;
};

const deleteTutorial = async (id) => {
  const tutorial = await Tutorial.findByIdAndDelete(id);
  if (!tutorial) {
    throw httpError(404, "Tutorial is not found");
  }
};

module.exports = {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
};
