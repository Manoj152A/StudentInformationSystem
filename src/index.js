import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/CSS/index.css"; // Update the import path for the index.css file
import Login from "./Components/Login"; // Update the import path for the Login component
import Homepage from "./Components/HomePage"; // Update the import path for the Homepage component
import Home from "./Components/Home"; // Update the import path for the Home component
import Forms from "./Components/Forms"; // Update the import path for the Forms component
import ControlPanel from "./Components/ControlPanel"; // Update the import path for the ControlPanel component
<<<<<<< HEAD:myapp/src/index.js
import StudentDetails from "./Components/StudentDetails";
import UserManagement from "./Components/UserManagement";
import DetailsPage from "./Components/DetailsPage";
// Rest of the component code remains the same
=======
import ForgotPassword from "./Components/ForgotPassword"; // Import the ForgotPassword component
import ResetPassword from "./Components/ResetPassword"; // Import the ResetPassword component
>>>>>>> 5858c330ae7333dfea531eb3ef59a3d702a99368:src/index.js

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />}>
          <Route index element={<Home />} />
          <Route path="forms" element={<Forms />} />
          <Route path="controlpanel" element={<ControlPanel />} />
<<<<<<< HEAD:myapp/src/index.js
          <Route path="studentdetails" element={<StudentDetails />} />
          <Route path="management/users" element={<UserManagement/>} />
          <Route path="/details/:detailsId" element={<DetailsPage />} />

=======
>>>>>>> 5858c330ae7333dfea531eb3ef59a3d702a99368:src/index.js
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
