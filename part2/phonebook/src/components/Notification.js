import React from 'react';

function Notification({ message, type }) {
  return (
    <div className={type === 'success' ? 'success' : 'error'}>{message}</div>
  );
}

export default Notification;
