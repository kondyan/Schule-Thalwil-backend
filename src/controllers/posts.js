const postService = require("../services/posts");
const ctrlWrapper = require("../util/ctrl-wrapper");

const getPosts = async (req, resp, next) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await postService.getPosts(page, limit);
  resp.json(posts);
};

const createPost = async (req, resp, next) => {
  const { title, imageUrl, content, isDraft } = req.body;
  const { _id } = req.user;

  const newPost = await postService.createPost(
    title,
    imageUrl,
    content,
    _id,
    isDraft
  );
  resp.status(201).json(newPost);
};

const uploadImage = async (req, resp, next) => {
  const imageUrl = req.imageUrl;

  resp.status(201).json(imageUrl);
};

const updatePost = async (req, resp, next) => {
  const { id } = req.params;
  const { title, imageUrl, content, isDraft } = req.body;
  const updatedPost = await postService.updatePost(
    id,
    title,
    imageUrl,
    content,

    isDraft
  );
  resp.json(updatedPost);
};

const deletePost = async (req, resp, next) => {
  const { id } = req.params;
  await postService.deletePost(id);
  resp.status(204).json();
};

module.exports = {
  getPosts: ctrlWrapper(getPosts),
  createPost: ctrlWrapper(createPost),
  uploadImage: ctrlWrapper(uploadImage),
  updatePost: ctrlWrapper(updatePost),
  deletePost: ctrlWrapper(deletePost),
};
