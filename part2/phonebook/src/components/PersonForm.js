import React from 'react';
import Input from './Input';

function PersonForm({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newPerson: { newName, newNumber },
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{' '}
        <Input type='text' handleChange={handleNameChange} value={newName} />
      </div>
      <div>
        number:{' '}
        <Input
          type='text'
          handleChange={handleNumberChange}
          value={newNumber}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
}

export default PersonForm;
