import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { initializeBlogs } from '../reducers/blogReducer';
import Blog from './Blog';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';
import {
  StyledLink,
  Container,
  List,
  ListItem,
  SecondaryTitle,
} from '../styled-components';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const blogMatch = useRouteMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="New blog +">
            <NewBlogForm />
          </Togglable>

          <SecondaryTitle>Blog list</SecondaryTitle>

          <List>
            {sortedBlogs.map((blog) => (
              <ListItem key={blog.id}>
                &rarr; {blog.title} {blog.author}{' '}
                <StyledLink to={`/blogs/${blog.id}`}>view &gt;</StyledLink>
              </ListItem>
            ))}
          </List>
        </Route>
      </Switch>
    </Container>
  );
};

export default Blogs;
