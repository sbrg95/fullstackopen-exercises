const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const emptyList = [];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa978b5c96762367h7f8',
    title: 'A blog with three likes',
    author: 'Unknown Author',
    url: 'http://www.u.arizona.edu/~unknown/threelikes.html',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b46a676684d22f8',
    title: 'A blog with two likes',
    author: 'Random Author',
    url: 'http://www.u.arizona.edu/~random/twolikes.html',
    likes: 3,
    __v: 0,
  },
  {
    _id: '5a433aa97a95c96762367h7f8',
    title: 'A blog with five likes',
    author: 'Unknown Author',
    url: 'http://www.u.arizona.edu/~unknown/fivelikes.html',
    likes: 5,
    __v: 0,
  },
];

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(25);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog(emptyList)).toEqual(null);
  });

  test('when list has only one blog, equals itself', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });

  test('of a bigger list is the blog with most likes', () => {
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual({
      title: listWithManyBlogs[0].title,
      author: listWithManyBlogs[0].author,
      likes: listWithManyBlogs[0].likes,
    });
  });
});

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual(null);
  });

  test('when list has only one blog, equals the author of that blog', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });

  test('of a bigger list is the author with most blogs', () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      author: 'Unknown Author',
      blogs: 2,
    });
  });
});

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes(emptyList)).toEqual(null);
  });

  test('when list has only one blog, equals the author of that blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('of a bigger list is the author with most likes', () => {
    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual({
      author: 'Unknown Author',
      likes: 12,
    });
  });
});
