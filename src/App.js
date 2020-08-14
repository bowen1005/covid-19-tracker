import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  const onCountryClick = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  // Useeffect runs a piece of code based on a given condition
  useEffect(() => {
    //asynch -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const fetchedCountries = data.map((countryList) => ({
            name: countryList.country,
            value: countryList.countryInfo.iso2,
          }));

          setCountries(fetchedCountries);
        });
    };

    getCountriesData();
  }, []);
  // If the condition array is empty the code inside here will run once when the component loads and not again
  // If there is a variable inside the array, the component will run once + whenever the variable inside the array changes

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryClick} value={country}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((item) => (
              <MenuItem value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats"></div>
    </div>
  );
}

export default App;

{
  /* Header */
}
{
  /* Title + selec input dropdown field */
}

{
  /* InfoBoxes */
}
{
  /* InfoBoxes */
}
{
  /* InfoBoxes */
}

{
  /* Table */
}
{
  /* Graph */
}

{
  /* Map */
}
