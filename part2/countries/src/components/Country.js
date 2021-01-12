import React from 'react';

function Country({ country, weather }) {
  const { name, capital, population, languages, flag } = country;
  const {
    temperature,
    weather_descriptions,
    weather_icons,
    wind_speed,
    wind_dir,
  } = weather.current;

  return (
    <div>
      <h1>{name}</h1>
      capital {capital} <br />
      population {population} <br />
      <h2>Spoken languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt={`${name} flag`} width='200' />
      <h2>Weather in {capital}</h2>
      <strong>temperature:</strong> {temperature} Celcius <br />
      <img
        src={weather_icons[0]}
        alt={`${weather_descriptions} weather icon`}
      />{' '}
      <br />
      <strong>wind:</strong> {wind_speed} mph direction {wind_dir}
    </div>
  );
}

export default Country;
