const tutorialService = require("../services/tutorials");
const ctrlWrapper = require("../util/ctrl-wrapper");

const getTutorials = async (req, resp, next) => {
  const tutorials = await tutorialService.getTutorials();
  resp.json(tutorials);
};

const createTutorial = async (req, resp, next) => {
  const { categoryId, title, description, videoUrl, isDraft } = req.body;
  const { _id } = req.user;

  const newTutorial = await tutorialService.createTutorial(
    categoryId,
    title,
    description,
    videoUrl,
    _id,
    isDraft
  );
  resp.status(201).json(newTutorial);
};

const updateTutorial = async (req, resp, next) => {
  const { id } = req.params;
  const { title, description, videoUrl, isDraft } = req.body;
  const updatedTutorial = await tutorialService.updateTutorial(
    id,
    title,
    description,
    videoUrl,
    isDraft
  );
  resp.json(updatedTutorial);
};

const deleteTutorial = async (req, resp, next) => {
  const { id } = req.params;
  await tutorialService.deleteTutorial(id);
  resp.status(204).json();
};

module.exports = {
  getTutorials: ctrlWrapper(getTutorials),
  createTutorial: ctrlWrapper(createTutorial),
  updateTutorial: ctrlWrapper(updateTutorial),
  deleteTutorial: ctrlWrapper(deleteTutorial),
};
