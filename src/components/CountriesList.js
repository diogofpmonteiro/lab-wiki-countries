import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiURL = 'https://ih-countries-api.herokuapp.com/countries';

const CountriesList = () => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL);
        setCountryList(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {countryList.map((eachCountry) => (
          <Link
            key={eachCountry.alpha3Code}
            className="list-group-item list-group-item-action"
            to={'/' + eachCountry.alpha3Code}
          >
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${eachCountry.alpha2Code.toLowerCase()}.png`}
              alt="country-flag"
            />
            <p>{eachCountry.name.common}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountriesList;
