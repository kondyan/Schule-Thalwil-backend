const express = require("express");
const ctrl = require("../controllers/categories");
const { validateBody } = require("../middleware/validate-body");
const { createCategoryDto } = require("../dto/create-category-dto");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/", ctrl.getCategories);

router.post(
  "/",
  authenticate,
  validateBody(createCategoryDto),
  ctrl.createCategory
);

router.patch(
  "/:id",
  authenticate,
  validateBody(createCategoryDto),
  ctrl.updateCategory
);

router.delete("/:id", authenticate, ctrl.deleteCategory);

module.exports = router;
