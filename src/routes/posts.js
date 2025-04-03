const express = require("express");
const ctrl = require("../controllers/posts");
const { validateBody } = require("../middleware/validate-body");
const { createPostDto } = require("../dto/create-post-dto");
const { authenticate } = require("../middleware/authenticate");
const {
  saveImageToCloudinary,
} = require("../middleware/saveImageToCloudinary");
const multer = require("multer");
const { access } = require("../middleware/access");

const router = express.Router();

router.get("/", ctrl.getPosts);

router.get("/authors/:id", ctrl.getPostsByAuthor);

router.get("/:id", ctrl.getPostById);

router.post(
  "/",
  authenticate,
  access("writer"),
  validateBody(createPostDto),
  ctrl.createPost
);

router.post(
  "/upload",
  authenticate,
  access("writer"),
  multer().single("image"),
  saveImageToCloudinary,
  ctrl.uploadImage
);

router.patch(
  "/:id",
  authenticate,
  access("writer"),
  validateBody(createPostDto),
  ctrl.updatePost
);

router.delete("/:id", authenticate, access("writer"), ctrl.deletePost);

module.exports = router;
