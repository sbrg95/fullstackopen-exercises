import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

test('receive the right details when a new blog is created', () => {
  const createBlog = jest.fn();

  const component = render(<NewBlogForm createBlog={createBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testing blog' },
  });

  fireEvent.change(author, {
    target: { value: 'sbrg95' },
  });

  fireEvent.change(url, {
    target: { value: 'www.sbrg95.com' },
  });

  fireEvent.submit(form);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog');
  expect(createBlog.mock.calls[0][0].author).toBe('sbrg95');
  expect(createBlog.mock.calls[0][0].url).toBe('www.sbrg95.com');
});
