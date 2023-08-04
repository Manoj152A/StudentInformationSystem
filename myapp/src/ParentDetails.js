import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./ParentDetails.css"; // Import the CSS file

const ParentDetails = () => {
  const formik = useFormik({
    initialValues: {
      studentId: 0,
      fatherName: "",
      motherName: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      studentId: Yup.number()
        .typeError("Student ID must be a number")
        .integer("Student ID must be an integer")
        .min(1, "Student ID must be at least 1")
        .required("Student ID is required"),
      fatherName: Yup.string().required("Required"),
      motherName: Yup.string().required("Required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Check if the studentId exists in the database
        const checkStudentResponse = await axios.get(
          `http://localhost:8087/parents/check-student/${values.studentId}`
        );

        const studentExists = checkStudentResponse.status === 200;

        if (studentExists) {
          // If student exists, proceed to store parent details
          const response = await axios.post(
            `http://localhost:8087/parents/${values.studentId}`,
            {
              fatherName: values.fatherName,
              motherName: values.motherName,
              contactNumber: values.contactNumber,
            }
          );

          if (response.status === 200) {
            alert("Parent details added successfully!");
          } else {
            alert("Failed to add parent details. Please try again later.");
          }
        } else {
          alert("Student ID is not available. Please provide a valid ID.");
        }
      } catch (error) {
        console.error("Error adding parent details:", error);
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
          Student Id
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
        <label htmlFor="fatherName" className="form-label">
          Father Name
        </label>
        <input
          id="fatherName"
          name="fatherName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fatherName}
        />
        {formik.touched.fatherName && formik.errors.fatherName ? (
          <div className="error-container">{formik.errors.fatherName}</div>
        ) : null}
        <br />

        <label htmlFor="motherName" className="form-label">
          Mother Name
        </label>
        <input
          id="motherName"
          name="motherName"
          type="text"
          className="form-input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.motherName}
        />
        {formik.touched.motherName && formik.errors.motherName ? (
          <div className="error-container">{formik.errors.motherName}</div>
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

        <button
          type="submit"
          className="form-submit-btn"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ParentDetails;
