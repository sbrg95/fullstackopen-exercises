const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const User = require('../models/user');
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json({
    ...savedBlog.toJSON(),
    user: { username: user.username, name: user.name },
  });
});

blogRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  const oldBlog = await Blog.findById(id);

  const query = {
    comments: oldBlog.comments.concat(comment),
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, query, {
    new: true,
  }).populate('user', {
    username: 1,
    name: 1,
  });

  response.json(updatedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: 'your do not have the permission to delete this blog' });
  }

  await blog.remove();
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
