// StudentDetails.js
import React, { useState, useEffect } from 'react';
import videoBackground from './istockphoto-1366783063-640_adpp_is.mp4';
import { Link } from 'react-router-dom';


function Enrollment() {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh', // Adjust this value as needed
    overflow: 'hidden',
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -100,
  }

  // State variables to handle user inputs and selections
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [institutionNames, setInstitutionNames] = useState([]);
  const [apiError, setApiError] = useState('');

  // Fetch institution names from the backend API
  useEffect(() => {
    fetch('http://localhost:8083/api/v1/institutions/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data is an array of institution names
        setInstitutionNames(data);
      })
      .catch((error) => {
        console.error('Error fetching institution names:', error);
        // Handle any error conditions, e.g., show an error message to the user
      });
  }, []);

  // ... (previous code)

const handleSearch = () => {
    // ... (previous code)
  
    // Declare apiEndpoint variable
    let apiEndpoint = '';
  
    // Determine the appropriate API endpoint based on the selected filter
    if (selectedFilter === 'studentId') {
      apiEndpoint = `http://localhost:8083/api/v1/students/${searchText}`;
    } else if (selectedFilter === 'username') {
      apiEndpoint = `http://localhost:8083/api/v1/students/userName`;
    } else if (selectedFilter === 'email') {
      apiEndpoint = `http://localhost:8083/api/v1/students/email`;
    }
  
    // Make the API call for search using fetch
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API Response Data:', data);
        if (data.message) {
          // ...
        } else {
          setSearchResults(data); // Update this line to set the student data directly
          setApiError('');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setApiError('No data found for the given inputs or invalid input');
        setSearchResults(null); // Set searchResults to null in case of error
      });
  };
  
  // ... (rest of the code)
  
  return (
    <div style={containerStyle}>
         <video autoPlay loop muted style={videoStyle}>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main style={{ color: '#8B0000' }}>
        <h3 style={{ textAlign: 'center', marginTop: '0.1px' }}>Enrollment Details</h3>
        <div style={{ display: 'flex', marginLeft: '280px' }}>
          {/* Institutions Dropdown */}
          <label htmlFor="institutionName">Select Institution:</label>
          <select
            id="institutionName"
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            style={{ backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px', transition: 'transform 0.1s ease-in-out' }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            <option value="">Select an institution</option>
            {institutionNames.map((institution) => (
              <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}}value={institution.name} key={institution.id}>
                {institution.name}
              </option>
            ))}
          </select>

          {/* Filters Dropdown */}
          <label htmlFor="filter">Select Filter:</label>
          <select 
            id="filter"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{ backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px', transition: 'transform 0.1s ease-in-out' }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          > 
            <option value="">Select a filter</option>
           <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}} value="studentId">Student ID</option>
           <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}} value="email">Email</option>
            <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}} value="username">username</option>
          </select>

          {/* Text Input */}
          <label  htmlFor="searchText">Enter Text:</label>
          <input 
            type="text"
            id="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px',fontFamily: 'Roboto, sans-serif',fontWeight: 'bold' }}
          />
          

          {/* Search Button */}
          <button
            style={{ marginLeft: '35px',  border: '100px',backgroundColor: '#34ff3e', color: '#373e37', borderRadius: '3px', transition: 'transform 0.1s ease-in-out',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
            onClick={handleSearch}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Search
          </button>

          {/* Create Button */}
          <Link to="/view-more">
          <button style={{ marginLeft: '70px', border: '100px', backgroundColor: '#34ff3e', color: '#373e37', borderRadius: '3px',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
          onClick={handleSearch}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}>Create</button>
          </Link>

        </div>
        

        {/* Display API Results */}
        <h4>Search Result:</h4>
        <div style={{ marginTop: '20px', width: '80%' }}>
            {searchResults.length > 0 && (
              <table style={{ width: '100%', border: '0.8px solid darkmagenta', borderCollapse: 'collapse', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>firstName</th>
                    <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>lastName</th>
                    <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>id</th>
                    <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>username</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((student, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                        {student.firstName}
                      </td>
                      <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                        {student.lastName}
                      </td>
                      <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                        {student.id}
                      </td>
                      <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta', position: 'relative' }}>
                        {student.userName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

        {/* Display API Error Message */}
        <div>
          {apiError && <p style={{ color: 'red', textAlign: 'center' }}>{apiError}</p>}
        </div>
        </div>
      </main>
    </div>
  );
}
export default Enrollment;