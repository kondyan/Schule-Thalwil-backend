const express = require("express");
const ctrl = require("../controllers/tutorials");
const { validateBody } = require("../middleware/validate-body");
const { validateQuery } = require("../middleware/validate-query");
const { pageQueryDto } = require("../dto/page-query-dto");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

router.get("/", validateQuery(pageQueryDto), ctrl.getTutorials);

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
