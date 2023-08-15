import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/CSS/index.css";
import Login from "./Components/Login";
import CreateUser from "./Components/CreateUser";
import Homepage from "./Components/HomePage"; // Update the import path for the Homepage component
import Home from "./Components/Home"; // Update the import path for the Home component
import Forms from "./Components/Forms"; // Update the import path for the Forms component
import ControlPanel from "./Components/ControlPanel"; // Update the import path for the ControlPanel component
import UserManagement from "./Components/UserManagement";
// Rest of the component code remains the same
import ForgotPassword from "./Components/ForgotPassword"; // Import the ForgotPassword component
import ResetPassword from "./Components/ResetPassword"; // Import the ResetPassword component
import StudentDetails from "./Components/StudentDetails";
import Enrollments from "./Components/Enrollments";
import StudentCreation from "./Components/StudentCreation";
import StudentEnrollment from "./Components/StudentEnrollment";
import ParentDetails from "./Components/ParentDetails";
import SiblingDetails from "./Components/SiblingDetails";
import Academy from "./Components/Academy";
import DetailsPage from './Components/DetailsPage';
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
          <Route path="management/users" element={<UserManagement />} />
          <Route path="management/users/details/:detailsId" element={<DetailsPage />} />
          <Route path="Enrollments" element={<Enrollments />} />
          <Route path="StudentCreation" element={<StudentCreation />} />
          <Route path="StudentEnrollment" element={<StudentEnrollment />} />
          <Route path="ParentDetails" element={<ParentDetails />} />
          <Route path="SiblingDetails" element={<SiblingDetails />} />
          <Route path="Academy" element={<Academy />} />
          <Route path="StudentDetails" element={<StudentDetails />} />
          <Route path="studentdetails/studentdashboard/:studentId" element={<Studentdashboard />} />
        </Route>              
        <Route path="/Create-User" element={<CreateUser/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

