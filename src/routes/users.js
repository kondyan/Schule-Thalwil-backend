const express = require("express");
const ctrl = require("../controllers/users");
const { validateBody } = require("../middleware/validate-body");
const { createUserDto } = require("../dto/create-user-dto");
const { authenticate } = require("../middleware/authenticate");
const { upload } = require("../util/saveFileToCloudinary");
const multer = require("multer");
const { saveToCloudinary } = require("../middleware/saveToCloudinary");
const router = express.Router();

router.get("/", authenticate, ctrl.getUsers);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.get("/:id", authenticate, ctrl.getUserById);

router.post("/", authenticate, validateBody(createUserDto), ctrl.addUser);

router.patch(
  "/avatar",
  authenticate,
  // upload.single("avatar"),
  multer().single("avatar"),
  saveToCloudinary,
  ctrl.updateAvatar
);

router.put("/update", authenticate, ctrl.updateUser);

router.delete("/:id", authenticate, ctrl.deleteUser);

module.exports = router;
