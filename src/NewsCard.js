import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { textShaver } from "text-shaver";
import moment from "moment";

import "./NewsCard.css";

function NewsCard({ title, image, url, timeStamp, ...props }) {
  const time = moment(timeStamp || moment.now()).fromNow();
  return (
    <div className="newscard">
      <Card className="newscard__card">
        <a href={url} target="_blank" className="newscard__link">
          <CardContent className="newscard__cardcontent">
            <div className="newscard__imagebox">
              <img className="newscard__img" src={image} alt="news-image" />
            </div>
            <div className="newscard__textbox">
              <h6>
                {textShaver(title, {
                  mode: "words",
                  limit: 9,
                  suffix: "...",
                })}
              </h6>
              <p className="newscard__timestamp">{time}</p>
            </div>
          </CardContent>
        </a>
      </Card>
    </div>
  );
}

export default NewsCard;
