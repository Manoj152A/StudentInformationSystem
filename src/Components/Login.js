// Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import "../CSS/Login.css";
import logo from "../images/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8089/api/login", {
        username,
        userpassword: password,
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("jwtToken", token);
        setLoginMessage("Login successful!");
        navigate("/homepage", { state: { username } });
      } else {
        setLoginMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setLoginMessage("Invalid username or password.");
      } else {
        setLoginMessage("Error occurred while logging in.");
      }
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleCreateUser = () => {
    navigate("/create-user"); // Navigate to the "CreateUser" page
  };

  return (
    <div className="Login">
      <header className="Header">
        <img src={logo} alt="Logo" className="Logo" />
        <h1>Student Information System</h1>
      </header>
      <div className="LoginFormContainer">
        <form className="LoginForm" onSubmit={handleSubmit}>
          <h2 className="FormTitle">Login</h2>
          <div className="FormRow">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="FormRow">
            <label htmlFor="password">Password:</label>
            <div className="PasswordInputWrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <BsEyeFill
                className="EyeIcon"
                size={20}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {loginMessage && <p className="LoginMessage">{loginMessage}</p>}
          <p className="CreateUserLink" onClick={handleCreateUser}>
            Create User
          </p>
          <p className="ForgotPasswordLink" onClick={handleForgotPassword}>
            Forgot Password
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
