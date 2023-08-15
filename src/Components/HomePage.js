import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { BsHouseDoor, BsFileText, BsGear, BsPerson, BsBoxArrowRight } from "react-icons/bs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import logo from "../images/logo.png";
import Home from "./Home";
import ControlPanel from "./ControlPanel";
import Forms from "./Forms";
import "../CSS/Homepage.css";
import StudentDetails from "./StudentDetails";
import Studentdashboard from "./Studentdashboard";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const getRoleByUsername = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8089/api/get-role/${username}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const storedRole = localStorage.getItem("userRole");

    if (token) {
      const decodedToken = jwtDecode(token);
      const username = decodedToken.sub;

      if (storedRole) {
        setRole(storedRole);
      } else {
        getRoleByUsername(username)
          .then((userRole) => {
            setRole(userRole);
            localStorage.setItem("userRole", userRole);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="Homepage" style={{ backgroundImage: `url('../images/background.jpeg')` }}>
      <header className="Header">
        <div className="HeaderContent">
          <img src={logo} alt="Logo" className="Logo" />
          <h1>Student Information System</h1>
          <div className="HeaderNav">
            <div className="IconContainer">
              <BsPerson size={24} />
              <span>{role}</span>
            </div>
            <div
              className="IconContainer"
              onMouseEnter={() => setMenuExpanded(true)}
              onMouseLeave={() => setMenuExpanded(false)}
            >
              <Link to="/homepage">
                <BsHouseDoor size={24} />
              </Link>
              {menuExpanded && <span className="Tooltip">Home</span>}
            </div>
            <div
              className="IconContainer"
              onMouseEnter={() => setMenuExpanded(true)}
              onMouseLeave={() => setMenuExpanded(false)}
            >
              <Link to="/homepage/forms">
                <BsFileText size={24} />
              </Link>
              {menuExpanded && <span className="Tooltip">Forms</span>}
            </div>
            <div
              className="IconContainer"
              onMouseEnter={() => setMenuExpanded(true)}
              onMouseLeave={() => setMenuExpanded(false)}
            >
              <Link to="/homepage/controlpanel">
                <BsGear size={24} />
              </Link>
              {menuExpanded && <span className="Tooltip">Control Panel</span>}
            </div>
            <div className="IconContainer">
              <BsBoxArrowRight size={24} onClick={handleLogout} />
            </div>
          </div>
        </div>
      </header>
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/controlpanel" element={<ControlPanel />} />
          <Route path="/studentdetails" element={<StudentDetails />} />
          <Route path="studentdetails/studentdashboard/:studentId" element={<Studentdashboard />} />

        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
