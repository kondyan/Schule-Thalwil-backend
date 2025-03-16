const { httpError } = require("../util/http-error");
const { Post } = require("../entities/post");

const getPosts = async () => {
  return Post.find();
};

const createPost = async (title, imageUrl, content, _id, isDraft) => {
  const newPost = await Post.create({
    title,
    imageUrl,
    content,
    author: _id,
    isDraft,
  });

  return newPost;
};

const updatePost = async (id, title, imageUrl, content, isDraft) => {
  const post = await Post.findByIdAndUpdate(
    id,
    { title, imageUrl, content, isDraft },
    {
      new: true,
    }
  );
  if (!post) {
    throw httpError(404, "Post is not found");
  }

  return post;
};

const deletePost = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw httpError(404, "Post is not found");
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
