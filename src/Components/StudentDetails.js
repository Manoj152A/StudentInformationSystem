// StudentDetails.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from './background.jpeg';

function StudentDetails() {
  const backgroundStyle = {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  

  // State variables to handle user inputs and selections
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [institutionNames, setInstitutionNames] = useState([]);
  const [apiError, setApiError] = useState('');

  // Fetch institution names from the backend API
  useEffect(() => {
    fetch('http://localhost:8087/api/v1/institutions/all')
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

  const handleSearch = () => {
    // Perform API call here using the selectedInstitution, selectedFilter, and searchText values
    // You can use fetch or axios to make the API call

    // Create the URL with query parameters based on the selected values
    const searchUrl = new URL('http://localhost:8086/students/search');
    searchUrl.searchParams.append('institutionName', selectedInstitution);

    // Append the filter parameter only when a filter other than the default value is selected
    if (selectedFilter !== "" && searchText.trim() !== "") {
      // Use selectedFilter as the parameter name and searchText as the parameter value
      searchUrl.searchParams.append(selectedFilter, searchText);
    }

    // Make the API call for search using fetch
    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message) {
          // If the API response contains a message, there is no data in the database
          setApiError(data.message);
          setSearchResults([]);
        } else {
          // If the API response does not contain a message, update the search results
          setSearchResults(data);
          setApiError('');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle any error conditions, e.g., show an error message to the user
        setApiError('No data found for the given inputs or invalid input');
        setSearchResults([]);
      });
  };

  return (
    <div style={backgroundStyle}>
         
      <main style={{ color: '#8B0000' }}>
        <h3 style={{ textAlign: 'center', marginTop: '0.1px' }}>Student Details</h3>
        <div style={{width: '80%', display: 'flex', justifyContent: 'center' }}>
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
            <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}} value="email">Email</option>
            <option style ={{ fontFamily: 'Roboto, sans-serif',fontWeight: 'bold'}} value="studentId">Student ID</option>
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
        <h4>Search Results:</h4>
        {searchResults.length > 0 && ( // Only render the table if there are search results
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <table style={{ width: '80%', border: '0.8px solid darkmagenta', borderCollapse: 'collapse',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>Institution Name</th>
                <th style={{ padding: '8px', backgroundColor: 'transparent' , color: 'darkmagenta' }}>Name</th>
                <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta' }}>Grade</th>
                <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta'}}>Username</th>
                <th style={{ padding: '8px', backgroundColor: 'transparent', color: 'darkmagenta'}}>Email</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((student, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                    {student.institutionName}
                  </td>
                  <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                    {student.studentName}
                  </td>
                  <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta' }}>
                    {student.grade}
                  </td>
                  <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta', position: 'relative' }}>
                    {student.username}
                    </td>
                  <td style={{ padding: '8px', color: 'darkmagenta', border: '1px solid darkmagenta', position: 'relative' }}>
                    {student.email}
                    <Link to="/view-more">
                    <button style={{ position: 'relative', left:'220px',border: '100px', backgroundColor: '#34ff3e', color: '#373e37', borderRadius: '3px',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
                     onClick={handleSearch}
                     onMouseEnter={(e) => {
                       e.target.style.transform = 'scale(1.1)';
                     }}
                     onMouseLeave={(e) => {
                       e.target.style.transform = 'scale(1)';
                     }}>view more</button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
         )}
        {/* Display API Error Message */}
        <div>
          {apiError && <p style={{ color: 'red', textAlign: 'center', }}>{apiError}</p>}
        </div>
      </main>
    </div>
  );
}

export default StudentDetails;