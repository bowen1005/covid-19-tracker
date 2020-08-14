import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {
	return (
		<div className="app">
			<div className="app__header"></div>
			<h1>COVID-19 TRACKER</h1>
			<FormControl className="app__dropdown">
				<Select variant="outlined" value="abc">
					<MenuItem value="worldwide">worldwide</MenuItem>
				</Select>
			</FormControl>

			{/* Header */}
			{/* Title + selec input dropdown field */}

			{/* InfoBoxes */}
			{/* InfoBoxes */}
			{/* InfoBoxes */}

			{/* Table */}
			{/* Graph */}

			{/* Map */}
		</div>
	);
}

export default App;
