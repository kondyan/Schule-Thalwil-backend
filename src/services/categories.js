const { httpError } = require("../util/http-error");
const { Category } = require("../entities/category");
const { Tutorial } = require("../entities/tutorial");

const getCategories = async () => {
  return Category.find();
};

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name,
  });

  return newCategory;
};

const updateCategory = async (id, name) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
    }
  );
  if (!category) {
    throw httpError(404, "Category is not found");
  }

  return category;
};

const deleteCategory = async (id) => {
  const totalCount = await Tutorial.countDocuments({ category: id });
  if (totalCount > 0) {
    throw httpError(409, "Category has Tutorials");
  }
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw httpError(404, "Category is not found");
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
