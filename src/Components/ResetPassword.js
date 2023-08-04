import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f0f0f0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  background-color: #6ba3e0;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ResetPasswordButton = styled.button`
  padding: 12px 20px;
  background-color: #6ba3e0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ReturnToLoginLink = styled.p`
  color: #6ba3e0;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1) rotateY(10deg);
  }
`;

const ValidationMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newToken, setNewToken] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { username } = location.state;
      const response = await axios.post("http://localhost:8089/reset-password/resetpassword", {
        username,
        resetToken: newToken,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Password reset successful!");
      } else {
        setMessage("Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while resetting the password.");
    }

    setIsLoading(false);
  };

  const handleReturnToLogin = () => {
    navigate("/");
  };

  const handlePasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    // Perform password validation here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordRegex.test(newPasswordValue));
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <h1>Student Information System</h1>
      </Header>
      {message ? (
        <FormContainer>
          <Form>
            <FormTitle>Password Reset Successful!</FormTitle>
            <p>You can now login with your new password.</p>
            <ReturnToLoginLink onClick={handleReturnToLogin}>
              Return to Login
            </ReturnToLoginLink>
          </Form>
        </FormContainer>
      ) : (
        <FormContainer>
          <Form onSubmit={handleResetPassword}>
            <FormTitle>Reset Password</FormTitle>
            <FormRow>
              <FormLabel htmlFor="username">Username:</FormLabel>
              <FormInput
                type="text"
                id="username"
                name="username"
                value={location.state.username}
                readOnly
              />
            </FormRow>
            <FormRow>
              <FormLabel htmlFor="resetToken">Reset Token:</FormLabel>
              <FormInput
                type="text"
                id="resetToken"
                name="resetToken"
                value={newToken}
                onChange={(e) => setNewToken(e.target.value)}
              />
            </FormRow>
            <FormRow>
              <FormLabel htmlFor="newPassword">New Password:</FormLabel>
              <FormInput
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
              />
            </FormRow>
            {!passwordValid && (
              <ValidationMessage>
                Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
              </ValidationMessage>
            )}
            <ResetPasswordButton type="submit" disabled={isLoading || !passwordValid}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </ResetPasswordButton>
            {message && <p>{message}</p>}
            <ReturnToLoginLink onClick={handleReturnToLogin}>
              Return to Login
            </ReturnToLoginLink>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default ResetPassword;
