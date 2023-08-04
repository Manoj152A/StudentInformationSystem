import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/CSS/index.css'; // Update the import path for the index.css file
import Login from './Components/Login';
import CreateUser from './Components/CreateUser'; // Make sure to provide the correct import path
import Homepage from './Components/HomePage';
import Home from './Components/Home';
import Forms from './Components/Forms';
import ControlPanel from './Components/ControlPanel';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

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
        <Route path="/create-user" element={<CreateUser />} /> {/* Add this route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);