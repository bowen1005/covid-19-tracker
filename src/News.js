import React from "react";
import NewsCard from "./NewsCard";

import "./News.css";

function News({ newsData, ...props }) {
  return (
    <div className="news">
      {newsData.map((item, index) => (
        // <h2>{item.title}</h2>
        <h5>
          <NewsCard
            title={item.title}
            image={item.urlToImage}
            url={item.url}
            timeStamp={item.publishedAt}
          />
        </h5>
      ))}
    </div>
  );
}

export default News;
