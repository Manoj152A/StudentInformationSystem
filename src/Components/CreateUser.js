import React, { useState, useEffect } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import axios from 'axios';
import logo from '../images/logo.png';
import styled from 'styled-components';

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
  text-align: center;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const FormSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const EyeIcon = styled(BsEyeFill)`
  cursor: pointer;
  margin-left: -30px; /* Adjust the margin as needed */
`;

const SubmitButton = styled.button`
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
`;

const CreateUser = () => {
  const [userRoleOptions, setUserRoleOptions] = useState([]);
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    user_password: '',
    email: '',
    role_id: '',
    institution_id: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: null }); // Clear error for the specific field
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!userData.username) {
      formErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z]{1,15}$/.test(userData.username)) {
      formErrors.username =
        'Username should only contain alphabets and have a maximum length of 15 characters';
    }

    if (!userData.user_password) {
      formErrors.user_password = 'Password is required';
    } else if (userData.user_password.length < 8) {
      formErrors.user_password = 'Password must be at least 8 characters long';
    } else if (!/^(?=.[a-zA-Z])(?=.[^a-zA-Z]).{8,}$/.test(userData.user_password)) {
      formErrors.user_password =
        'Password must contain alphabetical letters, numbers and at least one special character';
    }

    if (!userData.email) {
      formErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
      formErrors.email = 'Invalid email address';
    }

    if (!userData.role_id) {
      formErrors.role_id = 'Please select a role';
    }

    if (!userData.institution_id) {
      formErrors.institution_id = 'Please select an institution';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitError(null);
    } else {
      setErrors({});
      setSubmitting(true);

      axios
        .post('http://localhost:8089/users/add', userData)
        .then((response) => {
          console.log('User data stored successfully:', response.data);
          if (response.data === 'User details saved successfully') {
            setIsDataSaved(true);
            setUserData({
              username: '',
              user_password: '',
              email: '',
              role_id: '',
              institution_id: '',
            });
            setSubmitError(null);
          } else {
            setIsDataSaved(false);
          }
          setSubmitError(response.data);
        })
        .catch((error) => {
          console.error('Error storing user data:', error);
          setSubmitError('Error storing user data. Please try again.');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const fetchUserRoleOptions = () => {
    axios
      .get('http://localhost:8087/student/roles')
      .then((response) => {
        const rolesData = response.data;
        setUserRoleOptions(rolesData);
      })
      .catch((error) => {
        console.error('Error fetching user role data:', error);
        setUserRoleOptions([]);
      });
  };

  const fetchInstitutionOptions = () => {
    axios
      .get('http://localhost:8087/api/v1/institutions/all')
      .then((response) => {
        const institutions = response.data.map((institution) => ({
          label: institution.name,
          value: institution.id,
        }));
        setInstitutionOptions(institutions);
      })
      .catch((error) => {
        console.error('Error fetching institution data:', error);
        setInstitutionOptions([]);
      });
  };

  useEffect(() => {
    fetchUserRoleOptions();
    fetchInstitutionOptions();
  }, []);

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo" />
        <h1>Student Information System</h1>
      </Header>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Create Your User Profile</FormTitle>
          <FormRow>
            <FormLabel>Username:</FormLabel>
            <FormInput
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <FormLabel>Password:</FormLabel>
            <div>
              <FormInput
                type={showPassword ? 'text' : 'password'}
                name="user_password"
                value={userData.user_password}
                onChange={handleInputChange}
              />
              <EyeIcon size={20} onClick={() => setShowPassword(!showPassword)} />
            </div>
            {errors.user_password && <ErrorMessage>{errors.user_password}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <FormLabel>Email:</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <FormLabel>User Role:</FormLabel>
            <FormSelect
              name="role_id"
              value={userData.role_id}
              onChange={handleInputChange}
            >
              <option value="">Select User Role</option>
              {userRoleOptions.map((role) => (
                <option key={role.role_id} value={role.role_id}>
                  {role.role_name}
                </option>
              ))}
            </FormSelect>
            {errors.role_id && <ErrorMessage>{errors.role_id}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <FormLabel>Institution:</FormLabel>
            <FormSelect
              name="institution_id"
              value={userData.institution_id}
              onChange={handleInputChange}
            >
              <option value="">Select Institution Name</option>
              {institutionOptions.map((institution) => (
                <option key={institution.value} value={institution.value}>
                  {institution.label}
                </option>
              ))}
            </FormSelect>
            {errors.institution_id && <ErrorMessage>{errors.institution_id}</ErrorMessage>}
          </FormRow>
          <FormRow>
            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Create User'}
            </SubmitButton>
          </FormRow>
          <FormRow>
            {isDataSaved ? (
              <SuccessMessage>User data stored successfully!</SuccessMessage>
            ) : (
              submitError && <ErrorMessage>{submitError}</ErrorMessage>
            )}
          </FormRow>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default CreateUser;
