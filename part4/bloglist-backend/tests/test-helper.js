const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'first blog',
    author: 'sbrg',
    url: 'www.sbrg95.com',
    likes: 2,
  },
  {
    title: 'second blog',
    author: 'john doe',
    url: 'www.jdoe.com',
    likes: 4,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
