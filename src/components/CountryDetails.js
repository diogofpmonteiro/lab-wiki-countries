import { useState, useEffect } from 'react';
import countries from './../countries.json';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

const apiURL = 'https://ih-countries-api.herokuapp.com/countries/';

const getCountryName = (code) => {
  const theCountry = countries.find((oneCountry) => {
    return oneCountry.alpha3Code === code;
  });
  return theCountry.name.common;
};

const CountryDetails = () => {
  const [foundCountry, setFoundCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { countryId } = useParams();

  useEffect(() => {
    // ! get data from the static source
    // const thisCountry = countries.find((eachCountry) => {
    //   return eachCountry.alpha3Code === countryId;
    // });
    // setIsLoading(false);
    // setFoundCountry(thisCountry);

    // ! get data from an api
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL + countryId);
        setFoundCountry(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [countryId]); // <-- run this effect initially and whenever 'countryId' changes

  if (!foundCountry && !isLoading) return <Navigate to="/" />;

  return (
    <>
      {isLoading && <p>Loading data...</p>}
      {foundCountry && (
        <div className="col-7">
          <img
            style={{ width: '150px' }}
            src={
              'https://flagpedia.net/data/flags/icon/72x54/' +
              foundCountry.alpha2Code.toLowerCase() +
              '.png'
            }
            alt="country flag"
          />
          <h1>{foundCountry.name.official}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td>Capital</td>
                <td>{foundCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {foundCountry.area} km <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {foundCountry.borders.map((alpha3) => {
                      return (
                        <li key={alpha3}>
                          <Link to={'/' + alpha3}>
                            {getCountryName(alpha3)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CountryDetails;
