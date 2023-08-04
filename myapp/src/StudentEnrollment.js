import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To use navigation
import "./StudentEnrollment.css"; // Import the CSS file
import { Link } from "react-router-dom";
import ParentDetails from "./ParentDetails"; // Import ParentDetails component

const StudentEnrollment = () => {
  const Navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
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
      mobileNumber: 0,
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
      mobileNumber: Yup.number()
        .typeError("Mobile number must be a number")
        .positive("Mobile number must be a positive number")
        .integer("Mobile number must be an integer")
        .test(
          "len",
          "Mobile number must be exactly 10 digits",
          (val) => val.toString().length === 10
        )
        .required("Mobile number is required"),
      institutionId: Yup.number().required("Institution is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8087/student/add",
          values
        );

        if (response.status === 200) {
          setStudentId(response.data.studentId); // Assuming the server returns the student ID
          alert("Enrollment is successful");
          Navigate("/ParentDetails", {
            state: { studentId: response.data.studentId },
          });
        } else {
          alert("Enrollment failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error.response.data);
        alert("Enrollment failed. Please check the form data and try again.");
      }
    },
  });

  return (
    <div className="form-container">
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
          value={formik.values.first_name}
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
          value={formik.values.middle_name}
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
          value={formik.values.lastName}
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
          value={formik.values.preferredName}
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
          <option value="other">Other</option>
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
          Mobile Number:
        </label>
        <input
          id="mobileNumber"
          name="mobileNumber"
          type="number"
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
