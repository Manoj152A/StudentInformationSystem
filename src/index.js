import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/CSS/index.css";
import Login from "./Components/Login";
import Homepage from "./Components/HomePage";
import Home from "./Components/Home";
import Forms from "./Components/Forms";
import ControlPanel from "./Components/ControlPanel";
import UserManagement from "./Components/UserManagement";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import StudentDetails from "./Components/StudentDetails";
import DetailsPage from "./Components/DetailsPage";
import Studentdashboard from "./Components/Studentdashboard";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />}>
          <Route index element={<Home />} />
          <Route path="forms" element={<Forms />} />
          <Route path="controlpanel" element={<ControlPanel />} />
          <Route path="studentdetails" element={<StudentDetails />} />
          <Route path="studentdetails/studentdashboard/:studentId" element={<Studentdashboard />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
