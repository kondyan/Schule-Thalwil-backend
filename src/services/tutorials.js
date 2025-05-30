const { httpError } = require("../util/http-error");
const { Tutorial } = require("../entities/tutorial");
const { Category } = require("../entities/category");

const getTutorials = async (category, page, limit) => {
  const totalCount = await Tutorial.countDocuments({ category });
  const totalPages = Math.ceil(totalCount / limit);
  const data = await Tutorial.find({ category })
    .populate("author")
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);
  return { totalPages, currentPage: page, data };
};

const getTutorialsByAuthor = async (author) => {
  return Tutorial.find({ author }).populate("author").populate("category");
};

const createTutorial = async (
  category,
  title,
  description,
  videoUrl,
  _id,
  isDraft
) => {
  const categoryFound = Category.findById(category);
  if (!categoryFound) {
    throw httpError(404, "Category is not found");
  }
  const newTutorial = await Tutorial.create({
    category,
    title,
    description,
    videoUrl,
    author: _id,
    isDraft,
  });

  return newTutorial;
};

const updateTutorial = async (
  id,
  category,
  title,
  description,
  videoUrl,
  isDraft
) => {
  const tutorial = await Tutorial.findByIdAndUpdate(
    id,
    { category, title, description, videoUrl, isDraft },
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
  getTutorialsByAuthor,
  createTutorial,
  updateTutorial,
  deleteTutorial,
};
