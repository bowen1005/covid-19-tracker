import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#594d4d",
    rgb: "rgb(89, 77, 77)",
    half_op: "rgba(89, 77, 77, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat > 9999
    ? `${numeral(stat).format("0,0.0a")}`
    : `${numeral(stat).format("0,0")}`;

export const prettyTotalStat = (stat) =>
  stat ? `${numeral(stat).format("0,0.0a")}` : `${numeral(stat).format("0,0")}`;

// ? `${numeral(stat).format("0,0")}` : "0";
// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Total Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Total Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Total Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
