import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import CountriesList from './components/CountriesList';
import Country from './components/Country';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (search !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [search]);

  useEffect(() => {
    if (countries.length === 1) showCountry(countries[0]);
  }, [countries]);

  useEffect(() => {
    if (country) {
      const api_key = process.env.REACT_APP_WEATHER_API_KEY;
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        )
        .then((response) => setWeather(response.data));
    }
  }, [country]);

  const handleSearch = (event) => {
    setShowList(true);
    setCountry(null);
    setSearch(event.target.value);
  };

  const showCountry = (country) => {
    setShowList(false);
    setCountry(country);
  };

  return (
    <div>
      <Search handleSearch={handleSearch} search={search} />
      {showList && (
        <CountriesList countries={countries} showCountry={showCountry} />
      )}
      {country && weather && <Country country={country} weather={weather} />}
    </div>
  );
}

export default App;
