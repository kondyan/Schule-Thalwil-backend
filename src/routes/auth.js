const express = require("express");
const ctrl = require("../controllers/auth");
const { validateBody } = require("../middleware/validate-body");
const { createUserDto } = require("../dto/create-user-dto");
const { loginUserDto } = require("../dto/login-user-dto");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", validateBody(createUserDto), ctrl.register);

router.post("/login", validateBody(loginUserDto), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
