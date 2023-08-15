import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Route, Routes } from "react-router-dom"; // To use navigation
import ParentDetails from "./ParentDetails";

// import { Link } from "react-router-dom";

const StudentEnrollment = ({ onNext }) => {
  const [institutions, setInstitutions] = useState([]);

  // Fetch institutions data from the backend on component mount
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8087/api/v1/institutions/all"
        );
        setInstitutions(response.data);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };
    fetchInstitutions();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      lastName: "",
      preferredName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      address: "",
      grade: 0,
      username: "",
      mobileNumber: "",
      institutionId: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      middle_name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      preferredName: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
      grade: Yup.number()
        .typeError("Grade must be a number")
        .integer("Grade must be an integer")
        .min(1, "Grade must be at least 1")
        .max(12, "Grade cannot be more than 12")
        .required("Grade is required"),
      username: Yup.string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be at most 20 characters")
        .required("Username is required"),

      mobileNumber: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      institutionId: Yup.number().required("Institution is required"),
    }),
    onSubmit: async (values) => {
      const capitalizedValues = {
        ...values,
        first_name: capitalizeFirstLetter(values.first_name),
        middle_name: capitalizeFirstLetter(values.middle_name),
        lastName: capitalizeFirstLetter(values.lastName),
        preferredName: capitalizeFirstLetter(values.preferredName),
      };

      try {
        const response = await axios.post(
          "http://localhost:8087/student/add",
          capitalizedValues
        );

        console.log("Response status:", response.status);

        if (response.status === 200 || response.status === 201) {
          const newStudentId = response.data;
          localStorage.setItem("studentId", newStudentId); // Store student ID in localStorage
          const successMessage = `Enrollment is successful. Student ID: ${newStudentId}`;
          alert(successMessage);
          onNext(newStudentId); // Call the onNext function to pass the student ID
          //navigate(`/ParentDetails/${newStudentId}`);
          <Routes>
            <Route path="ParentDetails" element={<ParentDetails />} />
          </Routes>;
        } else {
          alert("Enrollment failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        if (error.response) {
          console.error("Response data:", error.response.data);
        }

        alert("Enrollment failed. Please check the form data and try again.");
      }
    },
  });
  const styles = `
    /* Container style */
    .form-container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 2px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }

    /* Label style */
    .form-label {
      font-weight: bold;
      display: inline-block;
      width: 150px;
      margin-bottom: 5px;
    }

    /* Input style */
    .form-input {
      width: 300px;
      padding: 5px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    /* Button style */
    .form-button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .form-button:hover {
      background-color: #45a049;
    }

    /* Error message style */
    .error-message {
      color: red;
    }
  `;

  return (
    <div className="form-container">
      <style>{styles}</style>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={capitalizeFirstLetter(formik.values.first_name)}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="error-message">{formik.errors.first_name}</div>
        ) : null}
        <br />

        <label htmlFor="middle_name" className="form-label">
          Middle Name
        </label>
        <input
          id="middle_name"
          name="middle_name"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={capitalizeFirstLetter(formik.values.middle_name)}
        />
        {formik.touched.middle_name && formik.errors.middle_name ? (
          <div className="error-message">{formik.errors.middle_name}</div>
        ) : null}
        <br />

        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={capitalizeFirstLetter(formik.values.lastName)}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error-message">{formik.errors.lastName}</div>
        ) : null}
        <br />

        <label htmlFor="preferredName" className="form-label">
          Preferred Name
        </label>
        <input
          id="preferredName"
          name="preferredName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={capitalizeFirstLetter(formik.values.preferredName)}
        />
        {formik.touched.preferredName && formik.errors.preferredName ? (
          <div className="error-message">{formik.errors.preferredName}</div>
        ) : null}
        <br />

        <label htmlFor="dateOfBirth" className="form-label">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div className="error-message">{formik.errors.dateOfBirth}</div>
        ) : null}
        <br />

        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? (
          <div className="error-message">{formik.errors.gender}</div>
        ) : null}
        <br />

        <label htmlFor="email" className="form-label">
          Email id
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
        <br />

        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="error-message">{formik.errors.address}</div>
        ) : null}
        <br />

        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          id="username"
          name="username"
          type="username"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error-message">{formik.errors.username}</div>
        ) : null}
        <br />

        <label htmlFor="grade" className="form-label">
          Grade:
        </label>
        <input
          id="grade"
          name="grade"
          type="number"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.grade}
        />
        {formik.touched.grade && formik.errors.grade ? (
          <div className="error-message">{formik.errors.grade}</div>
        ) : null}
        <br />

        <label htmlFor="mobileNumber" className="form-label">
          mobile Number
        </label>
        <input
          id="mobileNumber"
          name="mobileNumber"
          type="tel"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobileNumber}
        />
        {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
          <div className="error-message">{formik.errors.mobileNumber}</div>
        ) : null}

        <br />

        <label htmlFor="institutionId" className="form-label">
          Institution:
        </label>
        <select
          id="institutionId"
          name="institutionId"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.institutionId}
        >
          <option value="">Select an institution</option>
          {institutions.map((institution) => (
            <option key={institution.id} value={institution.id}>
              {institution.name} (ID: {institution.id})
            </option>
          ))}
        </select>
        {formik.touched.institutionId && formik.errors.institutionId ? (
          <div className="error-message">{formik.errors.institutionId}</div>
        ) : null}
        <br />
        <button type="submit" className="form-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default StudentEnrollment;
