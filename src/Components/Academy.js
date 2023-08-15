import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// CSS styles for the component
const styles = `
.academy-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #f15f5f;
  border-radius: 5px;
  background-color: #f7f7f7;
}
.academy-container h1 {
  color: #400303;
}
/* Academy Form */
.academy-form {
  display: grid;
  grid-gap: 10px;
}

/* Form Label */
.academy-form label {
  font-weight: bold;
  display: inline-block;
  width: 120px; /* Adjust the width as needed */
}

/* Specific Label Widths */
.academy-form label.label-width {
  width: 80px; /* Adjust the width as needed */
}

/* Form Input and Select */
.academy-form input[type="text"],
.academy-form select {
  box-sizing:border-box;
  width: 100%;
  padding: 8px;
  border: 1px solid black; 
  border-radius: 6px;
  font-size: 14px;
  min-width: 250px; /* Minimum width for better alignment */
}

/* Submit Button */
.academy-form button[type="submit"] {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  
}

.academy-form button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Header */
.academy-container h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Center Content */
.text-center {
  text-align: center;
}

/* Spacing */
.mb-10 {
  margin-bottom: 10px;
}

/* Responsive Styling */
@media (max-width: 480px) {
  .academy-container {
    max-width: 100%;
    border: none;
  }
}

.center-button {
  display: flex;
  justify-content: center;  /* Horizontally center the content */
  align-items: center;      /* Vertically center the content */
  margin-top: 20px;         /* Add spacing between the button and the rest of the form */
}
.alert {
  color: red;
  font-weight: bold;
  /* Add other styles as needed */
}
`;

function capitalizeFirstLetter(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Academy({ studentId }) {
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);

  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8087/api/v1/states/all"
        );
        setStatesData(response.data);
      } catch (error) {
        console.error("Error fetching states data:", error);
      }
    };

    fetchStatesData();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentId: studentId,
      stateId: "",
      cityId: "",
      districtId: "",
      schoolName: "",
      entryOrTransfer: "Entry",
    },
    validationSchema: Yup.object({
      stateId: Yup.string().required("State is required"),
      cityId: Yup.string().required("City is required"),
      districtId: Yup.string().required("District is required"),
      schoolName: Yup.string().required("School Name is required"),
      entryOrTransfer: Yup.string().required("Please select Entry/Transfer"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = {
          studentId: values.studentId,
          stateId: values.stateId,
          cityId: values.cityId,
          districtId: values.districtId,
          schoolName: values.schoolName,
          entryOrTransfer: values.entryOrTransfer,
          // Add other form fields as needed
        };

        const response = await axios.post(
          "http://localhost:8087/academies",
          formData
        );
        console.log("Data successfully submitted:", response.data);

        // Reset form fields after successful submission
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
  });

  const handleStateChange = async (selectedStateId) => {
    try {
      const response = await axios.get(
        `http://localhost:8087/api/v1/cities/all`
      );
      setCitiesData(response.data);
      formik.setFieldValue("stateId", selectedStateId);
      formik.setFieldValue("cityId", "");
      formik.setFieldValue("districtId", "");
      formik.setFieldValue("schoolName", "");
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
  };

  const handleCityChange = async (selectedCityId) => {
    try {
      const response = await axios.get(
        `http://localhost:8087/api/v1/districts/districts/all`
      );
      setDistrictsData(response.data);
      formik.setFieldValue("cityId", selectedCityId);
      formik.setFieldValue("districtId", "");
      formik.setFieldValue("schoolName", "");
    } catch (error) {
      console.error("Error fetching districts data:", error);
    }
  };

  return (
    <div className="academy-container">
      <style>{styles}</style>
      <form className="academy-form" onSubmit={formik.handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={formik.values.studentId}
            readOnly // Make the input field read-only
          />
        </div>
        <div>
          <label>State Name:</label>
          <select
            value={formik.values.stateId}
            onChange={(e) => {
              formik.handleChange(e);
              handleStateChange(e.target.value);
            }}
          >
            <option value="">Select a state</option>
            {statesData.map((state) => (
              <option key={state.id} value={state.id}>
                {state.statename}
              </option>
            ))}
          </select>
          {formik.touched.stateId && formik.errors.stateId && (
            <div className="error-container">{formik.errors.stateId}</div>
          )}
        </div>
        <div>
          <label>City Name:</label>
          <select
            value={formik.values.cityId}
            onChange={(e) => {
              formik.handleChange(e);
              handleCityChange(e.target.value);
            }}
          >
            <option value="">Select a city</option>
            {citiesData
              .filter(
                (city) => city.stateid === parseInt(formik.values.stateId)
              )
              .map((city) => (
                <option key={city.id} value={city.id}>
                  {city.cityname}
                </option>
              ))}
          </select>
          {formik.touched.cityId && formik.errors.cityId && (
            <div className="error-container">{formik.errors.cityId}</div>
          )}
        </div>
        <div>
          <label>District Name:</label>
          <select
            value={formik.values.districtId}
            onChange={formik.handleChange}
            name="districtId" // Add the name attribute
          >
            <option value="">Select a district</option>
            {districtsData
              .filter(
                (district) => district.cityid === parseInt(formik.values.cityId)
              )
              .map((district) => (
                <option key={district.id} value={district.id}>
                  {district.districtname}
                </option>
              ))}
          </select>
          {formik.touched.districtId && formik.errors.districtId && (
            <div className="error-container">{formik.errors.districtId}</div>
          )}
        </div>

        <div>
          <label>School Name:</label>
          <input
            type="text"
            name="schoolName" // Add the name attribute
            value={capitalizeFirstLetter(formik.values.schoolName)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.schoolName && formik.errors.schoolName && (
            <div className="error-container">{formik.errors.schoolName}</div>
          )}
        </div>
        <div>
          <label>Entry/Transfer:</label>
          <select
            value={formik.values.entryOrTransfer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="entryOrTransfer" // Add the name attribute
          >
            <option value="Entry">Entry</option>
            <option value="Transfer">Transfer</option>
          </select>
          {formik.touched.entryOrTransfer && formik.errors.entryOrTransfer && (
            <div className="error-container">
              {formik.errors.entryOrTransfer}
            </div>
          )}
        </div>
        {/* Rest of the form */}
        <div className="center-button">
          {/* Use the Link component to navigate */}
          <Link to={"/homepage"} className="link-button">
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Academy;
