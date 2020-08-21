import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./InfoBox.css";

function InfoBox({ title, cases, active, isRed, isSad, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`
        infoBox ${active && "infoBox--selected"} 
        ${isRed && "infoBox--red"} 
        ${isSad && "infoBox--sad"}
      `}
    >
      <CardContent className="infoBox__cardcontent">
        {/* Title */}
        <Typography className="infoBox__total" color="textSecondary">
          {title}
        </Typography>

        {/* Number of new cases */}
        <h2
          className={`
            infoBox__cases 
            ${isRed && "infoBox__cases--red"} 
            ${isSad && "infoBox__cases--sad"}
          `}
        >
          {cases}
        </h2>

        {/* Total cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
