const { httpError } = require("../util/http-error");
const { Post } = require("../entities/post");

const getPosts = async (page, limit) => {
  const totalCount = await Post.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
  const data = await Post.find()
    .populate("author")
    .skip((page - 1) * limit)
    .limit(limit);

  return { totalPages, currentPage: page, data };
};

const getPostById = async (id) => {
  return Post.findById(id).populate("author");
};

const getPostsByAuthor = async (author) => {
  return Post.find({ author });
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

const deletePost = async (id, user) => {
  const post = await Post.findById(id);
  if (!post) {
    throw httpError(404, "Post is not found");
  }
  if (!user.role.includes("admin") && user._id !== post.author) {
    throw httpError(403);
  }
  await post.deleteOne();
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};
