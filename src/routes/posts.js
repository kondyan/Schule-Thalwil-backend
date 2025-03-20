const express = require("express");
const ctrl = require("../controllers/posts");
const { validateBody } = require("../middleware/validate-body");
// const { createCategoryDto } = require("../dto/create-category-dto");
const { authenticate } = require("../middleware/authenticate");
const {
  saveImageToCloudinary,
} = require("../middleware/saveImageToCloudinary");
const multer = require("multer");

const router = express.Router();

router.get("/", ctrl.getPosts);

router.post(
  "/",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.createPost
);

router.post(
  "/upload",
  authenticate,
  multer().single("image"),
  saveImageToCloudinary,
  ctrl.uploadImage
);

router.patch(
  "/:id",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.updatePost
);

router.delete("/:id", authenticate, ctrl.deletePost);

module.exports = router;
