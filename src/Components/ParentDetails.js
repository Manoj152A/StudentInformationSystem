import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import SiblingDetails from "./SiblingDetails";

// CSS styles for the component
const styles = `
  .form-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .form-label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
  }

  .error-container {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }

  .form-submit-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  .form-submit-btn:hover {
    background-color: #0056b3;
  }
`;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ParentDetails = ({ studentId, onNext }) => {
  const formik = useFormik({
    initialValues: {
      studentId: studentId, // Use the studentId prop directly
      fatherName: "",
      motherName: "",
      contactNumber: "",
    },
    validationSchema: Yup.object({
      fatherName: Yup.string().required("Required"),
      motherName: Yup.string().required("Required"),
      contactNumber: Yup.string()
        .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const capitalizedValues = {
        ...values,
        firstName: capitalizeFirstLetter(values.fatherName),
        middleName: capitalizeFirstLetter(values.motherName),
      };
      try {
        // Proceed to store parent details

        const response = await axios.post(
          `http://localhost:8087/parents/${values.studentId}?fatherName=${capitalizedValues.fatherName}&motherName=${capitalizedValues.motherName}&contactNumber=${values.contactNumber}`
        );

        if (response.status === 200) {
          alert("Parent details added successfully!");
          onNext(studentId); // Call the onNext function to navigate
          <Routes>
            <Route path="SiblingDetails" element={<SiblingDetails />} />
          </Routes>;
        } else {
          alert("Failed to add parent details. Please try again later.");
        }
      } catch (error) {
        console.error("Error adding parent details:", error);
        console.log(error.response); // Log the error response object
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
      <style>{styles}</style>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="studentId" className="form-label">
          Student Id
        </label>
        <input
          id="studentId"
          name="studentId"
          type="number"
          className="form-input"
          value={studentId}
          readOnly // Make the input field read-only
        />
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
          value={capitalizeFirstLetter(formik.values.fatherName)}
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
          value={capitalizeFirstLetter(formik.values.motherName)}
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
          Save
        </button>
      </form>
    </div>
  );
};

export default ParentDetails;
