import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { Button, Navbar, Nav, NavItem, Logo } from '../styled-components';

const Navigation = () => {
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Navbar>
      <Logo>blog app</Logo>
      <Nav>
        <NavItem link>
          <Link to="/">Blogs</Link>
        </NavItem>
        <NavItem link>
          <Link to="/users">Users</Link>
        </NavItem>
        <NavItem>{user.name}</NavItem>
        <NavItem>
          <Button onClick={handleLogout}>Logout</Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
