import React from 'react';

function CountriesList({ countries, showCountry }) {
  return (
    <>
      {countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}

      {countries.length > 1 &&
        countries.length < 10 &&
        countries.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        ))}
    </>
  );
}

export default CountriesList;
