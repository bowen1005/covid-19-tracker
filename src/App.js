import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  Button,
} from "@material-ui/core";
// import numeral from "numeral";

import { sortData, prettyPrintStat, prettyTotalStat } from "./util";

import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [casesTypeBgCol, setCasesTypeBgCol] = useState(
    "rgba(204, 16, 52, 0.5)"
  );
  const [casesTypeBordCol, setCasesTypeBordCol] = useState("#CC1034");
  const [fetchData, setFetchData] = useState();

  const onCountryClick = async (event) => {
    const countryCode = event.target.value;
    // console.log(`EVENT TARGET VALUE >>> ${event.target.value}`);
    setCountry(countryCode);
    // let fetchedData;

    let url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&twoDaysAgo=false&strict=true`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFetchData(data);
        // setCountry(() => countryCode);
        // if (countryCode !== "worldwide") {
        //   setMapCenter(() => [data.countryInfo.lat, data.countryInfo.long]);
        //   setMapZoom(() => 4);
        // }
        setCountryInfo(() => data);
        // console.log(`DATA.COUNTRY >>>${data.country}`);
      });
    // console.log(`MAPCENTER >>> ${mapCenter[0]}, ${mapCenter[1]}`);
    // console.log(`MAPZOOM >>> ${mapZoom}`);
    // console.log(`COUNTRY (ouside of the scope) >>> ${country}`);
    // console.log(`COUNTRYINFO (outisde of the scope) >>>${countryInfo.country}`);
  };

  useEffect(() => {
    if (country !== "worldwide") {
      setMapCenter(() => [
        fetchData.countryInfo.lat,
        fetchData.countryInfo.long,
      ]);
      setMapZoom(() => 4);
    }
  }, [fetchData]);
  // console.log("COUNTRY INFO >>>", countryInfo);

  useEffect(() => {
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false"
        : `https://disease.sh/v3/covid-19/countries/${country}?yesterday=true&twoDaysAgo=false&strict=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (country === "worldwide") {
          setCountry("worldwide");
          setCountryInfo(data);
          setMapCenter({ lat: 22.593726, lng: 30.83949 });
          setMapZoom(2);
        }
      });
  }, [country]);

  // Useeffect runs a piece of code based on a given condition
  useEffect(() => {
    //async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch(
        "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false"
      )
        .then((response) => response.json())
        .then((data) => {
          const fetchedCountries = data.map((countryList) => ({
            name: countryList.country,
            value: countryList.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(fetchedCountries);
          // console.log(`COUNTRIES VALUE ${countries.value}`);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    switch (casesType) {
      case "cases":
        setCasesTypeBgCol("rgba(204, 16, 52, 0.5)");
        setCasesTypeBordCol("#CC1034");
        break;
      case "recovered":
        setCasesTypeBgCol("rgba(125, 215, 29, 0.5)");
        setCasesTypeBordCol("#7dd71d");
        break;
      case "deaths":
        setCasesTypeBgCol("rgba(89, 77, 77, 0.5)");
        setCasesTypeBordCol("#594d4d");
        break;
      default:
        setCasesTypeBgCol("rgba(204, 16, 52, 0.5)");
        setCasesTypeBordCol("#CC1034");
    }
  }, [casesType]);

  // If the condition array is empty the code inside here will run once when the component loads and not again
  // If there is a variable inside the array, the component will run once + whenever the variable inside the array changes

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          {/* Title + select input dropdown field */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryClick}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((item) => (
                <MenuItem value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes 3x */}
        <div className="app__stats">
          <InfoBox
            onClick={(event) => setCasesType("cases")}
            active={casesType === "cases"}
            isRed
            title="New Cases Today"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyTotalStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(event) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered Today"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyTotalStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(event) => setCasesType("deaths")}
            active={casesType === "deaths"}
            isSad
            title="Deaths Today"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyTotalStat(countryInfo.deaths)}
          />
        </div>

        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>
            <Tooltip
              title="Total cases of every country sorted from highest to lowest"
              placement="right"
            >
              <span>
                <Button disabled className="app__charttitle">
                  Cases by country
                </Button>
              </span>
            </Tooltip>
          </h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>
            <Tooltip
              title="This is the difference between the shown date and the previous day's data"
              placement="right"
            >
              <span>
                <Button disabled className="app__graphtitle">
                  Worldwide {casesType} trend
                </Button>
              </span>
            </Tooltip>
          </h3>
          <LineGraph
            className="app__graph"
            casesType={casesType}
            casesTypeBgCol={casesTypeBgCol}
            casesTypeBordCol={casesTypeBordCol}
          />
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
