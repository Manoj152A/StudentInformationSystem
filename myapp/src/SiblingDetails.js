// SiblingsForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./SiblingsDetails.css"; // Use the exact file path

const SiblingDetails = () => {
  const formik = useFormik({
    initialValues: {
      studentId: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: 0,
    },
    validationSchema: Yup.object({
      studentId: Yup.number().required("Student ID is required"),
      firstName: Yup.string().required("First Name is required"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Last Name is required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check if the studentId exists in the database
        const checkResponse = await axios.get(
          `http://localhost:8087/siblings/check/${values.studentId}`
        );

        const studentExists = checkResponse.status === 200;

        if (studentExists) {
          // If student exists, proceed to store parent details
          const response = await axios.post(
            `http://localhost:8087/siblings/${values.studentId}`,
            {
              firstName: values.firstName,
              middleName: values.middleName,
              lastName: values.lastName,
              contactNumber: values.contactNumber,
            }
          );

          if (response.status === 200) {
            alert("sibling details added successfully!");
          } else {
            alert("Failed to add sibling details. Please try again later.");
          }
        } else {
          alert("Student ID is not available. Please provide a valid ID.");
        }
      } catch (error) {
        console.error("Error adding sibling details:", error);
        if (error.response && error.response.data) {
          alert("Error: " + error.response.data);
        } else if (error.message) {
          alert("An error occurred: " + error.message);
        } else {
          alert("An unknown error occurred. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="studentId" className="form-label">
          Student ID
        </label>
        <input
          id="studentId"
          name="studentId"
          type="number"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.studentId}
        />
        {formik.touched.studentId && formik.errors.studentId ? (
          <div className="error-container">{formik.errors.studentId}</div>
        ) : null}
        <br />

        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error-container">{formik.errors.firstName}</div>
        ) : null}
        <br />
        <label htmlFor="middleName" className="form-label">
          Middle Name
        </label>
        <input
          id="middleName"
          name="middleName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.middleName}
        />
        {formik.touched.middleName && formik.errors.middleName ? (
          <div className="error-container">{formik.errors.middleName}</div>
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
          <div className="error-container">{formik.errors.lastName}</div>
        ) : null}
        <br />

        <label htmlFor="contactNumber" className="form-label">
          Contact Number
        </label>
        <input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.contactNumber}
        />
        {formik.touched.contactNumber && formik.errors.contactNumber ? (
          <div className="error-container">{formik.errors.contactNumber}</div>
        ) : null}
        <br />
        <button type="submit" className="form-submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default SiblingDetails;
