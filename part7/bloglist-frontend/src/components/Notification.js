import React from 'react';
import { useSelector } from 'react-redux';
import { Error, Success, Container } from '../styled-components';

function Notification() {
  const notification = useSelector(({ notification }) => notification);

  if (!notification) {
    return null;
  }

  return (
    <Container>
      {notification.type === 'error' ? (
        <Error>{notification.message}</Error>
      ) : (
        <Success>{notification.message}</Success>
      )}
    </Container>
  );
}

export default Notification;
