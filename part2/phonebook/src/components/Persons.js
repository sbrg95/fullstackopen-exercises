import React from 'react';
import Person from './Person';

function Persons({ persons, deletePerson }) {
  return (
    <div>
      {persons
        .filter((person) => !!person)
        .map(({ id, name, number }) => (
          <Person
            key={id}
            name={name}
            number={number}
            deletePerson={() => deletePerson(id)}
          />
        ))}
    </div>
  );
}

export default Persons;
