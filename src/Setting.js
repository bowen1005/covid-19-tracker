import React from "react";
import { Switch, FormGroup, FormControlLabel } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./Setting.css";

function Setting({ checked, onChange, description, ...props }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#808080",
      },
    },
  });

  return (
    <div className="setting">
      <FormGroup>
        <FormControlLabel
          control={
            <ThemeProvider theme={theme}>
              <Switch
                size="small"
                color="primary"
                className="setting__switch"
                checked={checked}
                onChange={onChange}
              />
            </ThemeProvider>
          }
          label={description}
        ></FormControlLabel>
      </FormGroup>

      {/* <h1 className="setting__description">{description}</h1> */}
    </div>
  );
}

export default Setting;
