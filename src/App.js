// styles
import './App.css';
//data
import countries from './countries.json';
//components
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
//routes
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />

          <Routes>
            <Route
              path="/:countryId"
              element={<CountryDetails countries={countries} />}
            />
            <Route
              path="/"
              element={
                <div className="col-7">
                  <h2>Select a country</h2>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
