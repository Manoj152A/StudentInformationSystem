import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Image from '../images/background.jpeg'; // Make sure the path to the image is correct
import { Link } from 'react-router-dom'; // Add this import

const StudentDashboard = () => {
  const location = useLocation();
  const studentDetails = location.state;

  // Retrieve studentId from URL params
  const { studentId } = useParams();

  const [studentDashboardData, setStudentDashboardData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log('Fetching data for student ID:', studentId);
    fetch(`http://localhost:8082/${studentId}`)
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Network response was not ok - Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        // Provide a sample child photo path for demonstration
        data.profilePhoto = '/sample-child-profile-photo.jpg';
        setStudentDashboardData(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error fetching student dashboard data:', error);
        setError(error.message); // Set the error state
      });
  }, [studentId]);
    
  // Define your data rows here
  const dataRows = [
    { label: 'Name:', value: `${studentDashboardData?.firstName || ''} ${studentDashboardData?.middleName || ''} ${studentDashboardData?.lastName || ''}` },
    { label: 'Date of Birth:', value: studentDashboardData?.dateOfBirth || '' },
    { label: 'Gender:', value: studentDashboardData?.gender || '' },
    { label: 'Address:', value: studentDashboardData?.address || '' },
    { label: 'Mobile:', value: studentDashboardData?.mobileNumber || '' },
    { label: 'Institution ID:', value: studentDashboardData?.institutionId || '' },
    
    // Add more data rows as needed
  ];
  const dashboardContentStyle = {
    margin: '1px',
    padding: 'px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%', // Adjust the width as needed
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent background
  };

  const dataContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '5px',
    marginBottom: '10px',
  };

  const dataRowStyle = {
    display: 'flex',
    alignItems: 'right',
    marginBottom: '5px', // Add some vertical spacing between rows
  };
  
  const labelStyle = {
    flex: '1',
    fontWeight: 'bold',
    marginRight: '10px',
    textAlign: 'right',
    color: 'gray', // Change the label color to gray
  };
  
  const valueStyle = {
    flex: '1',
    color: 'black', // Change the value color to black
  };

  const pageStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column', // Align content vertically
    alignItems: 'left', // Center horizontally
    justifyContent: 'flex-start', // Align content at the top
  };
  const tabTitleStyles = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'white', // Set text color to white
    padding: '10px',
    cursor: 'pointer',
    border: '1px solid white', // White border for the tab buttons
    borderRadius: '20px', // Increase the border radius for a rounded appearance
    marginRight: '10px',
    transition: 'background-color 0.3s, color 0.3s',
    width: '220px', // Slightly reduce the width for a sleeker look
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC', // Use the same blue color
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  };
  
  
  // Rest of the code remains the same
  return (
    <div style={pageStyle}>
      <div style={dashboardContentStyle}>
        {/* Display student details */}
        {studentDetails && (
          <h2>Student ID: {studentDetails.studentId || ''}</h2>
        )}
        {/* Display student dashboard data */}
        {error ? (
          <p>Error: {error}</p>
        ) : (
          studentDashboardData && (
            <div>
              <div style={dataContainerStyle}>
                {dataRows.map((row, index) => (
                  <div key={index} style={dataRowStyle}>
                    <span style={labelStyle}>{row.label}</span>
                    <span style={valueStyle}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      {/* Place the tabs here */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

        <Link to='/Financials' className='tabLink'>
          <div className='tabTitle' style={tabTitleStyles}>
            Financials
          </div>
        </Link>
        <Link to='/Enrollments' className='tabLink'>
          <div className='tabTitle' style={tabTitleStyles}>
           Course Enrollments
          </div>
        </Link>
        <Link to='/Schedule' className='tabLink'>
          <div className='tabTitle' style={tabTitleStyles}>
            Schedule
          </div>
        </Link>
        <Link to='/Reports' className='tabLink'>
          <div className='tabTitle' style={tabTitleStyles}>
            Report Card
          </div>
        </Link>
        <Link to='/Academicinfo' className='tabLink'>
          <div className='tabTitle' style={tabTitleStyles}>
            Academic
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;





