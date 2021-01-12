import React, { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleNewBlog = (target) => {
    setNewBlog({ ...newBlog, [target.name.toString()]: target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    createBlog(blogObject);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => handleNewBlog(target)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => handleNewBlog(target)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => handleNewBlog(target)}
          />
        </div>

        <button id="newblog-btn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
