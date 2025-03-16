const express = require("express");
const ctrl = require("../controllers/tutorials");
const { validateBody } = require("../middleware/validate-body");
// const { createCategoryDto } = require("../dto/create-category-dto");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/", ctrl.getTutorials);

router.post(
  "/",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.createTutorial
);

router.patch(
  "/:id",
  authenticate,
  //   validateBody(createCategoryDto),
  ctrl.updateTutorial
);

router.delete("/:id", authenticate, ctrl.deleteTutorial);

module.exports = router;
