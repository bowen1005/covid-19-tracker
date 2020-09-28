import React from "react";
import numeral from "numeral";
import "./Table.css";

function Table({
  countries,
  setCountry,
  fetchData,
  setCountryInfo,
  setMapCenter,
  setMapZoom,
  ...props
}) {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr
          onClick={() => {
            setCountry(countryInfo.iso2);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          className="table__row"
        >
          <td className="table__country">{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
