import React from 'react';

function Input({ type, handleChange, value }) {
  return (
    <>
      <input type={type} onChange={handleChange} value={value} />
    </>
  );
}

export default Input;
