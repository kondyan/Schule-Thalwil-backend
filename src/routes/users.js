const express = require("express");
const ctrl = require("../controllers/users");
const { validateBody } = require("../middleware/validate-body");
const { createUserDto } = require("../dto/create-user-dto");
const { authenticate } = require("../middleware/authenticate");
const { upload } = require("../util/saveFileToCloudinary");
const multer = require("multer");
const { saveToCloudinary } = require("../middleware/saveToCloudinary");
const { updateUserDto } = require("../dto/update-user-dto");
const { access } = require("../middleware/access");
const { setRoleDto } = require("../dto/set-role-dto");
const router = express.Router();

router.get("/", authenticate, ctrl.getUsers);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.get("/:id", authenticate, ctrl.getUserById);

router.post(
  "/",
  authenticate,
  access("admin"),
  validateBody(createUserDto),
  ctrl.addUser
);

router.patch(
  "/avatar",
  authenticate,
  // upload.single("avatar"),
  multer().single("avatar"),
  saveToCloudinary,
  ctrl.updateAvatar
);

router.patch(
  "/update",
  authenticate,
  validateBody(updateUserDto),
  ctrl.updateUser
);

router.patch(
  "/:_id/role",
  authenticate,
  access("admin"),
  // validateBody(setRoleDto),
  validateBody(updateUserDto),
  ctrl.setRole
);

router.delete("/:id", authenticate, access("admin"), ctrl.deleteUser);

module.exports = router;
