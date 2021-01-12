import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBlog, likeBlog, addComment } from '../reducers/blogReducer';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';
import {
  Button,
  Input,
  Form,
  List,
  ListItem,
  PrimaryTitle,
  SecondaryTitle,
  Loading,
} from '../styled-components';

const Blog = ({ blog }) => {
  const user = useSelector(({ user }) => user);
  const comment = useField('text', 'comment', 'comment');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      history.push('/');
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment.value));
    comment.reset();
  };

  if (!blog) {
    return <Loading />;
  }

  return (
    <div>
      <PrimaryTitle className="txt-center">
        {blog.title} {blog.author}
      </PrimaryTitle>
      <List>
        <ListItem>Url: {blog.url}</ListItem>
        <ListItem>
          Likes: {blog.likes}{' '}
          <Button onClick={() => dispatch(likeBlog(blog.id))} primary>
            like
          </Button>
        </ListItem>
        <ListItem>User: {blog.user.name}</ListItem>
        <ListItem>
          {blog.user.username === user.username && (
            <Button onClick={handleRemove} primary>
              remove
            </Button>
          )}
        </ListItem>
      </List>

      <SecondaryTitle>comments</SecondaryTitle>
      <Form onSubmit={handleComment}>
        <Input
          placeholder="type your comment..."
          className="mb-sm"
          {...comment.getPureField()}
        />
        <Button type="submit" primary>
          add comment
        </Button>
      </Form>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem key={`${blog.id}#${index}`}>&rarr; {comment}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default Blog;
