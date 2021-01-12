import React from 'react';

function Person({ name, number, deletePerson }) {
  return (
    <div>
      {name} {number} <button onClick={deletePerson}>delete</button>
    </div>
  );
}

export default Person;
