// ScheduleSearch.js
import React, { useState } from 'react';
import videoBackground from './istockphoto-1366783063-640_adpp_is.mp4';


function ScheduleSearch() {
  const [searchText, setSearchText] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2023-2024');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  const academicYearOptions = [
    '2020-2021',
    '2021-2022',
    '2022-2023',
    '2023-2024',
    '2024-2025',
  ];

  const handleSearch = () => {
    if (!Number.isInteger(parseInt(searchText))) {
        setErrorMessage('Student ID must be a valid integer.');
        return;
      }
    
    // Send the studentId and academicYear to the backend API
    const apiUrl = `http://localhost:8086/api/schedule/${searchText}?academicYear=${selectedAcademicYear}`;

    // Perform the HTTP request using fetch API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the searchResults state with the received data
        setSearchResults(data);
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('Incorrect academic year or Student not registered for academic year: ' + selectedAcademicYear);
      });
  };

  return (

    
    <div style={containerStyle}>
      <video autoPlay loop muted style={videoStyle}>
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <main style={{ color: '#8B0000' }}>
   <h1 style={{ textAlign: 'center', marginTop: '0.1px', fontSize: '28px', fontFamily: 'Source Sans Pro', fontWeight: 'bold' }}>Schedule Search</h1>

      <div style={{textAlign: 'center' }}>
        {/* Student ID Text Input */}
        <label htmlFor="searchText">Enter Student ID:</label>
        <input
          type="text"
          id="searchText"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px' }}
        />

        {/* Academic Year Dropdown */}
        <label htmlFor="academicYear">Select Academic Year:</label>
        <select
          id="academicYear"
          value={selectedAcademicYear}
          onChange={(e) => setSelectedAcademicYear(e.target.value)}
          style={{ marginLeft: '10px', backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px',transition: 'transform 0.1s ease-in-out',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)'}}
          onClick={handleSearch}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}>
          {academicYearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          style={{
            marginLeft: '35px',
            border: '1px',
            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '3px',
            transition: 'transform 0.1s ease-in-out',
            backgroundColor: '#34ff3e', 
            color: '#373e37',
          }}
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
         {/* Display Error Message */}
         {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      </div>

      {/* Display Search Results as Table */}
      <h4>Search Results:</h4>
      {searchResults.length > 0 && ( // Only render the table if there are search results
      <table style={{ width: '80%', border: '0.8px solid darkmagenta', borderCollapse: 'collapse', marginLeft: '120px',marginTop: '80px',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)'}}>
        <thead>
          <tr>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>studentId</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>first name</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>last name</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>subjectId</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>subjectName</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>grade</th>
            <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>academicYear</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.studentId}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.firstName}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.lastName}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.subjectId}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.subjectName}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.grade}
              </td>
              <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                {result.academicYear}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </main>
    </div>
  );
}

export default ScheduleSearch;