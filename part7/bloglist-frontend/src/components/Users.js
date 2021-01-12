import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { initUsers } from '../reducers/usersReducer';
import User from './User';
import {
  Table,
  TableRow,
  TableHead,
  TableData,
  PrimaryTitle,
  Container,
} from '../styled-components';

const Users = () => {
  const users = useSelector(({ users }) => users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  const userMatch = useRouteMatch('/users/:id');
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Container>
      <Switch>
        <Route path="/users/:id">
          <User user={user} />
        </Route>
        <Route path="/users">
          <PrimaryTitle className="txt-center">Users</PrimaryTitle>

          <Table>
            <thead>
              <TableRow>
                <TableHead>Users</TableHead>
                <TableHead>Blogs created</TableHead>
              </TableRow>
            </thead>
            <tbody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableData>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableData>
                  <TableData>
                    {user.blogs.reduce((counter, blog) => counter + 1, 0)}
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </Container>
  );
};

export default Users;
