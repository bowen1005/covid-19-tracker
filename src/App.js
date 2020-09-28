import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  Button,
  Tab,
  Tabs,
  AppBar,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Collapse from "@material-ui/core/Collapse";

import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import News from "./News";
import Setting from "./Setting";
import TabPanel from "./TabPanel";
import Table from "./Table";

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
  const [displaySettings, setDisplaySettings] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [newsURL, setNewsURL] = useState(
    "http://newsapi.org/v2/top-headlines?" +
      `country=us&` +
      "q=covid&" +
      "category=health&" +
      "apiKey=6a0340d66a8d4a13984051562afcc7f4"
  );
  const [newsData, setNewsData] = useState([]);
  const [yesterday, setYesterday] = useState(false);

  const onCountryClick = async (event) => {
    const countryCode = event.target.value;
    // console.log(`EVENT TARGET VALUE >>> ${event.target.value}`);
    setCountry(countryCode);
    // let fetchedData;

    let url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all?yesterday=${yesterday}&twoDaysAgo=false`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=${yesterday}&twoDaysAgo=false&strict=false`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFetchData(data);
        setCountryInfo(() => data);
      });
  };

  const onSettingsClick = () => {
    setDisplaySettings(!displaySettings);
  };

  const handleTabsChange = (event, value) => {
    setTabValue(value);
  };

  const handleYesterdayChange = () => {
    setYesterday((prev) => !prev);
  };

  useEffect(() => {
    if (country !== "worldwide") {
      setMapCenter(() => [
        fetchData.countryInfo.lat,
        fetchData.countryInfo.long,
      ]);
      setMapZoom(() => 4);
      setCountryInfo(fetchData);
    }
  }, [fetchData]);
  // console.log("COUNTRY INFO >>>", countryInfo);

  useEffect(() => {
    const url =
      country === "worldwide"
        ? `https://disease.sh/v3/covid-19/all?yesterday=${yesterday}&twoDaysAgo=false`
        : `https://disease.sh/v3/covid-19/countries/${country}?yesterday=${yesterday}&twoDaysAgo=false&strict=false`;

    const changeOnCountryChange = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (country === "worldwide") {
            setCountry("worldwide");
            setCountryInfo(data);
            setMapCenter({ lat: 22.593726, lng: 30.83949 });
            setMapZoom(2);
          } else {
            setFetchData(data);
          }
        });
    };

    changeOnCountryChange();
  }, [country, yesterday]);

  // Useeffect runs a piece of code based on a given condition
  useEffect(() => {
    //async -> send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/countries?yesterday=${yesterday}&twoDaysAgo=false`
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

  useEffect(() => {
    var req = new Request(newsURL);
    let fetchNews = async () => {
      await fetch(req)
        .then((response) => response.json())
        .then((data) => {
          setNewsData(data.articles);
          console.log(data.articles);
        });
    };

    fetchNews();
  }, []);

  // If the condition array is empty the code inside here will run once when the component loads and not again
  // If there is a variable inside the array, the component will run once + whenever the variable inside the array changes

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          {/* Title + select input dropdown field */}
          <div className="app__headergroup1">
            <h1 className="app__headertitle">COVID-19 TRACKER</h1>
            <SettingsIcon
              fontSize="small"
              className="app__settingsbutton"
              onClick={onSettingsClick}
            />
          </div>

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
        {/* Settings Box */}
        {/* <div className="app__settings">
          {displaySettings ? (
            <Settings displaySettings={displaySettings} />
          ) : null}
        </div> */}
        <Collapse in={displaySettings}>
          <Card className="app__settingsmenu">
            <CardContent className="app_settingsitems">
              <Setting
                description={"Yesterday's data"}
                checked={yesterday}
                onChange={handleYesterdayChange}
              />
            </CardContent>
          </Card>
        </Collapse>
        {/* InfoBoxes 3x */}
        <div className="app__stats">
          <InfoBox
            onClick={(event) => setCasesType("cases")}
            active={casesType === "cases"}
            casesType={casesType}
            isRed
            title="New Cases Today"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyTotalStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(event) => setCasesType("recovered")}
            active={casesType === "recovered"}
            casesType={casesType}
            title="Recovered Today"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyTotalStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(event) => setCasesType("deaths")}
            active={casesType === "deaths"}
            casesType={casesType}
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
            {/* <Tooltip
              title="Total cases of every country sorted from highest to lowest"
              placement="right"
            >
              <span>
                <Button disabled className="app__charttitle">
                  Cases by country
                </Button>
              </span>
            </Tooltip> */}
          </h3>
          <AppBar className="app__appbar" position="static">
            <Tabs
              value={tabValue}
              onChange={handleTabsChange}
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab label="Global Cases" />
              <Tab label="News" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Table
                countries={tableData}
                setCountry={setCountry}
                setCountryInfo={setCountryInfo}
                setMapCenter={setMapCenter}
                setMapZoom={setMapZoom}
                fetchData={fetchData}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <News className="app__news" newsData={newsData} />
            </TabPanel>
          </AppBar>

          {/* Table */}

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
