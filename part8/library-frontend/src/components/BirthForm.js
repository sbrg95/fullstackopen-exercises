import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const BirthForm = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const result = useQuery(ALL_AUTHORS);

  const HandleSubmit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, year: Number(year) } });

    setName('');
    setYear('');
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={HandleSubmit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option disabled value="">
            select author...
          </option>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born{' '}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
