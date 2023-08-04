import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
`;

const GenerateTokenButton = styled.button`
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

const LoginLink = styled.p`
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

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:8089/reset-password", {
        params: { username },
      });

      if (response.status === 200) {
        const resetToken = response.data;
        setResetToken(resetToken);
        setMessage(`Your reset token: ${resetToken}`);
      } else {
        setMessage("Invalid username.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while processing the request.");
    }

    setIsLoading(false);
  };

  const handleResetPassword = () => {
    navigate("/reset-password", { state: { username, resetToken } });
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <h1>Student Information System</h1>
      </Header>
      <FormContainer>
        <Form onSubmit={handleForgotPassword}>
          <FormTitle>Forgot Password</FormTitle>
          <FormRow>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <FormInput
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormRow>
          <GenerateTokenButton type="submit" disabled={isLoading}>
            {isLoading ? "Generating Token..." : "Generate Token"}
          </GenerateTokenButton>
          {message && <p>{message}</p>}
          {resetToken && (
            <LoginLink onClick={handleResetPassword}>
              Proceed to Reset Password
            </LoginLink>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;
