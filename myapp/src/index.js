import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/CSS/index.css"; // Update the import path for the index.css file
import Login from "./Components/Login"; // Update the import path for the Login component
import Homepage from "./Components/HomePage"; // Update the import path for the Homepage component
import Home from "./Components/Home"; // Update the import path for the Home component
import Forms from "./Components/Forms"; // Update the import path for the Forms component
import ControlPanel from "./Components/ControlPanel"; // Update the import path for the ControlPanel component

// Rest of the component code remains the same

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />}>
          <Route index element={<Home />} />
          <Route path="forms" element={<Forms />} />
          <Route path="controlpanel" element={<ControlPanel />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

