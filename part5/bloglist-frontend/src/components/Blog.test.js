import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('component is rendered with the blog title and author', () => {
  const blog = {
    title: 'testing blog',
    author: 'sbrg95',
    url: 'www.sbrg95.com',
    likes: 0,
    user: {
      username: 'sbrg95',
      name: 'bargaouz saad',
    },
  };

  const like = jest.fn();
  const remove = jest.fn();

  const user = { username: 'sbrg95', name: 'bargaouz saad' };

  const component = render(
    <Blog blog={blog} user={user} like={like} remove={remove} />
  );

  expect(component.container).toHaveTextContent('testing blog');
  expect(component.container).toHaveTextContent('sbrg95');

  const blogDetail = component.container.querySelector('.blogDetail');
  expect(blogDetail).toHaveStyle('display: none');
});

test("blog's url and number of likes shown when button show detail clicked", () => {
  const blog = {
    title: 'testing blog',
    author: 'sbrg95',
    url: 'www.sbrg95.com',
    likes: 0,
    user: {
      username: 'sbrg95',
      name: 'bargaouz saad',
    },
  };

  const like = jest.fn();
  const remove = jest.fn();
  const user = { username: 'sbrg95', name: 'bargaouz saad' };

  const component = render(
    <Blog blog={blog} user={user} like={like} remove={remove} />
  );

  const blogDetail = component.container.querySelector('.blogDetail');
  const showButton = component.getByText('show');

  fireEvent.click(showButton);

  expect(blogDetail).not.toHaveStyle('display: none');
});

test('check if the like button works', () => {
  const blog = {
    title: 'testing blog',
    author: 'sbrg95',
    url: 'www.sbrg95.com',
    likes: 0,
    user: {
      username: 'sbrg95',
      name: 'bargaouz saad',
    },
  };

  const like = jest.fn();
  const remove = jest.fn();
  const user = { username: 'sbrg95', name: 'bargaouz saad' };

  const component = render(
    <Blog blog={blog} user={user} like={like} remove={remove} />
  );

  const likeButton = component.getByText('like');

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(like.mock.calls).toHaveLength(2);
});
