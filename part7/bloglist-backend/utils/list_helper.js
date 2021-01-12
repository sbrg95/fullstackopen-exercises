const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likesSum = 0;
  blogs.forEach((blog) => (likesSum += blog.likes));
  return likesSum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((favorite, current) =>
    favorite.likes > current.likes ? favorite : current
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const bloggers = [];
  blogs.forEach((blog) => {
    let exist = false;
    bloggers.forEach((blogger) => {
      if (blogger.author === blog.author) {
        blogger.blogs += 1;
        exist = true;
      }
    });

    if (!exist) {
      bloggers.push({
        author: blog.author,
        blogs: 1,
      });
    }
  });

  return bloggers.reduce((most, current) =>
    most.blogs > current.blogs ? most : current
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const bloggers = [];
  blogs.forEach((blog) => {
    let exist = false;
    bloggers.forEach((blogger) => {
      if (blogger.author === blog.author) {
        blogger.likes += blog.likes;
        exist = true;
      }
    });

    if (!exist) {
      bloggers.push({
        author: blog.author,
        likes: blog.likes,
      });
    }
  });
  return bloggers.reduce((most, current) =>
    most.likes > current.likes ? most : current
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
