import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';
import {
  Button,
  SecondaryTitle,
  Form,
  InputField,
  Input,
  Label,
} from '../styled-components';

const NewBlogForm = () => {
  const title = useField('text', 'title', 'title');
  const author = useField('text', 'author', 'author');
  const url = useField('text', 'url', 'url');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(blogObject));

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <SecondaryTitle className="txt-center">Create new</SecondaryTitle>

      <Form onSubmit={addBlog}>
        <InputField>
          <Label>Title:</Label>
          <Input {...title.getPureField()} />
        </InputField>
        <InputField>
          <Label>Author:</Label>
          <Input {...author.getPureField()} />
        </InputField>
        <InputField>
          <Label>Url:</Label>
          <Input {...url.getPureField()} />
        </InputField>

        <Button id="newblog-btn" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
