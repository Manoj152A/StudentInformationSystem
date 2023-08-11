import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/CSS/index.css"; // Update the import path for the index.css file
import Login from "./Components/Login"; // Update the import path for the Login component
import Homepage from "./Components/HomePage"; // Update the import path for the Homepage component
import Home from "./Components/Home"; // Update the import path for the Home component
import Forms from "./Components/Forms"; // Update the import path for the Forms component
import ControlPanel from "./Components/ControlPanel"; // Update the import path for the ControlPanel component
import UserManagement from "./Components/UserManagement";
// Rest of the component code remains the same
import ForgotPassword from "./Components/ForgotPassword"; // Import the ForgotPassword component
import ResetPassword from "./Components/ResetPassword"; // Import the ResetPassword component
import StudentDetails from "./Components/StudentDetails";
import DetailsPage from './Components/DetailsPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />}>
          <Route index element={<Home />} />
          <Route path="forms" element={<Forms />} />
          <Route path="controlpanel" element={<ControlPanel />} />          
          <Route path="management/users" element={<UserManagement/>} />
          <Route path="management/users/details/:detailsId" element={<DetailsPage />} />
          <Route path="StudentDetails" element={<StudentDetails/>}/>
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
