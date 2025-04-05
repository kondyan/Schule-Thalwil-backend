const express = require("express");
const ctrl = require("../controllers/tutorials");
const { validateBody } = require("../middleware/validate-body");
const { validateQuery } = require("../middleware/validate-query");
const { pageQueryDto } = require("../dto/page-query-dto");
const { authenticate } = require("../middleware/authenticate");
const { access } = require("../middleware/access");
const { createTutorialDto } = require("../dto/create-tutorial-dto");

const router = express.Router();

router.get("/:categoryId", validateQuery(pageQueryDto), ctrl.getTutorials);

router.post(
  "/",
  authenticate,
  access("writer"),
  validateBody(createTutorialDto),
  ctrl.createTutorial
);

router.patch(
  "/:id",
  authenticate,
  access("writer"),
  validateBody(createTutorialDto),
  ctrl.updateTutorial
);

router.delete("/:id", authenticate, access("writer"), ctrl.deleteTutorial);

module.exports = router;
