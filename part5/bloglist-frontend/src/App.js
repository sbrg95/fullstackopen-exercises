import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type, timeout = 5000) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({
        message: '',
        type: '',
      });
    }, timeout);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      showNotification('wrong username or password', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));

    showNotification(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      'success'
    );
  };

  const handleLikes = async (id, blogObject) => {
    const updatedBlog = await blogService.like(id, blogObject);
    setBlogs(
      blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog
      )
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm login={handleLogin} />
      </div>
    );
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      showNotification('Blog removed successfully', 'success', 2000);
    } catch (exception) {
      showNotification('An error occured while removing this blog!', 'error');
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification.message} type={notification.type} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog">
        <NewBlogForm createBlog={addBlog} />
      </Togglable>
      <div className="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={handleLikes}
            remove={handleRemove}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
