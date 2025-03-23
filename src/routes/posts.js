const express = require("express");
const ctrl = require("../controllers/posts");
const { validateBody } = require("../middleware/validate-body");
const { createPostDto } = require("../dto/create-post-dto");
const { authenticate } = require("../middleware/authenticate");
const {
  saveImageToCloudinary,
} = require("../middleware/saveImageToCloudinary");
const multer = require("multer");

const router = express.Router();

router.get("/", ctrl.getPosts);

router.get("/:id", ctrl.getPostById);

router.post("/", authenticate, validateBody(createPostDto), ctrl.createPost);

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
  validateBody(createPostDto),
  ctrl.updatePost
);

router.delete("/:id", authenticate, ctrl.deletePost);

module.exports = router;
