const express = require("express");
const ctrl = require("../controllers/posts");
const { validateBody } = require("../middleware/validate-body");
// const { createCategoryDto } = require("../dto/create-category-dto");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/", ctrl.getPosts);

router.post(
  "/",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.createPost
);

router.patch(
  "/:id",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.updatePost
);

router.delete("/:id", authenticate, ctrl.deletePost);

module.exports = router;
