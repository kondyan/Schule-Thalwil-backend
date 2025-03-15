const categoryService = require("../services/categories");
const ctrlWrapper = require("../util/ctrl-wrapper");

const getCategories = async (req, resp, next) => {
  const categories = await categoryService.getCategories();
  resp.json(categories);
};

const createCategory = async (req, resp, next) => {
  const { name } = req.body;

  const newCategory = await categoryService.createCategory(name);
  resp.status(201).json(newCategory);
};

const updateCategory = async (req, resp, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await categoryService.updateCategory(id, name);
  resp.json(updatedCategory);
};

const deleteCategory = async (req, resp, next) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  resp.status(204).json();
};

module.exports = {
  getCategories: ctrlWrapper(getCategories),
  createCategory: ctrlWrapper(createCategory),
  updateCategory: ctrlWrapper(updateCategory),
  deleteCategory: ctrlWrapper(deleteCategory),
};
