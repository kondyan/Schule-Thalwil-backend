const ctrlWrapper = (ctrl) => {
  const func = async (req, resp, next) => {
    try {
      await ctrl(req, resp, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
