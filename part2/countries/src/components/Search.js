import React from 'react';

function Search({ handleSearch, search }) {
  return (
    <div>
      find countries{' '}
      <input type='text' onChange={handleSearch} value={search} />
    </div>
  );
}

export default Search;
