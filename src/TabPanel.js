import React from "react";

function TabPanel({ children, value, index, ...props }) {
  return <div>{value === index && <h4>{children}</h4>}</div>;
}

export default TabPanel;
