import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const clearFields = () => {
    setNewName('');
    setNewNumber('');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (!person) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          clearFields();
          showNotification(`Added ${returnedPerson.name}`, 'success');
        })
        .catch((error) => {
          showNotification(error.response.data.error, 'error');
        });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )
    ) {
      const modifiedPerson = {
        ...person,
        number: newNumber,
      };

      personService
        .update(person.id, modifiedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          clearFields();
        })
        .catch((error) => {
          showNotification(error.response.data.error, 'error');
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <Filter handleFilter={handleFilter} filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newPerson={{ newName, newNumber }}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
