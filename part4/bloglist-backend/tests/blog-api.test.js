const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test-helper');
const app = require('../app.js');
const api = supertest(app);

const User = require('../models/user');
const Blog = require('../models/blog');

jest.setTimeout(50000);

beforeEach(async () => {
  await User.deleteMany({});
  const user = new User({
    username: 'admin',
    name: 'Superuser',
    passwordHash: await bcrypt.hash('admin', 10),
  });
  await user.save();

  await Blog.deleteMany({});
  helper.initialBlogs.forEach((blog) => (blog.user = user._id));
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('viewing multiple blogs', () => {
  test('blogs return as json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'third blog',
      author: 'mary jane',
      url: 'www.mjane.com',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test('succeeds with valid data', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newBlog = {
      title: 'third blog',
      author: 'mary jane',
      url: 'www.mjane.com',
      likes: 1,
    };

    const token = login.body.token;
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('third blog');
  });

  test('likes property will default to the value 0 when missing', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newBlog = {
      title: 'third blog',
      author: 'mary jane',
      url: 'www.mjane.com',
    };

    const token = login.body.token;
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const newBlogFromDb = blogsAtEnd.find(
      (blog) => blog.title === newBlog.title
    );

    expect(newBlogFromDb.likes).toBe(0);
  });

  test('fail with status code 400 if data invalid', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const newBlog = {
      author: 'mary jane',
      likes: 5,
    };
    const token = login.body.token;
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });
});

describe('blog deletion', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const token = login.body.token;
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('blog updating', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToEdit = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send({ likes: 10 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const editedBlog = blogsAtEnd[0];

    expect(editedBlog.likes).toBe(10);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'sbrg95',
      name: 'Bargaouz Saad',
      password: 'dqsfggh',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ad',
      name: 'superuser',
      password: '123456789',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('non valid username or password');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is invalid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'admin',
      name: 'superuser',
      password: '12',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('non valid username or password');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'ultrauser',
      password: 'admin',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
