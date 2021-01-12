import React from 'react';
import {
  List,
  ListItem,
  PrimaryTitle,
  SecondaryTitle,
  Loading,
} from '../styled-components';

const User = ({ user }) => {
  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <PrimaryTitle className="txt-center">{user.name}</PrimaryTitle>
      <SecondaryTitle>Added blogs</SecondaryTitle>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>&rarr; {blog.title}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
