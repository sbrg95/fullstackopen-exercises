import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, like, remove, user }) => {
  const [visible, setVisible] = useState(false);

  const showDetails = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    like(blog.id, likedBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <span className="title">{blog.title}</span> {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={showDetails} className="blogDetail">
        {blog.url}
        <br />
        {blog.likes} <button onClick={handleLikes}>like</button>
        <br />
        {blog.user.name}
        <br />
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Blog;
