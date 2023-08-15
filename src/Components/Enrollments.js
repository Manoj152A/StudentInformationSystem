// StudentDetails.js
import React, { useState} from 'react';
import Image from '../images/background.jpeg';
import { Link } from 'react-router-dom';


function Enrollment() {
  const backgroundStyle = {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '110vh',
    fontFamily: 'Arial, sans-serif',
  };


  // State variables to handle user inputs and selections
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState('');

 

  // ... (previous code)

  const handleSearch = () => {
    // Clear previous errors
    setApiError('');

    if (!searchText.trim()) {
      setApiError('Please enter a valid search text');
      setSearchResults([]);
      return;
    }

  // Construct the API endpoint based on the selected filter
  let apiEndpoint = `http://localhost:8087/api/students/${searchText}`;

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
        setSearchResults(data);
        setApiError('');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setApiError('No data found for the given inputs or invalid input');
      setSearchResults(null);
    });
};
  
  // ... (rest of the code)
  
  return (
    <div style={backgroundStyle}>
        
      <main style={{ backgroundColor: 'transparent',color: '#8B0000',height:'500px' }}>
        <h3 style={{ textAlign: 'center', marginTop: '0.1px' }}>Enrollment Details</h3>
        <div style={{ display: 'flex', marginLeft: '80px' }}>
        


          {/* Text Input */}
          <label  htmlFor="searchText" style ={{  textAlign: "center", marginTop: "10px"}}>Enter Text:</label>
          <input 
            type="text"
            id="searchText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Id,username,firstname,etc..'
            style={{width: '200px', backgroundColor: 'transparent', color: 'darkmagenta', borderRadius: '3px',fontFamily: 'Roboto, sans-serif',fontWeight: 'bold' }}
          />
          

          {/* Search Button */}
          <button
            style={{ marginLeft: '35px',  border: '100px',backgroundColor: '#6ba3e0;', color: '#fff', borderRadius: '3px', transition: 'transform 0.1s ease-in-out',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
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
          <Link to="/homepage/StudentCreation" className="button-link">
          <button style={{ padding:'13px 20px',marginLeft: '70px', border: '100px', backgroundColor: '#6ba3e0', color: '#fff;', borderRadius: '3px',boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)' }}
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
        
       {/* Conditional Rendering of Results Table */}
       {searchResults.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
          <table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '20px', color: 'darkmagenta' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Student Name</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Username</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Institution Name</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Entry Level</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Student ID</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.studentId}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{result.studentName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{result.username}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{result.institutionName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{result.entryLevel}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{result.studentId}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
        
        <div>
          {apiError && <p style={{ color: 'red', textAlign: 'center', }}>{apiError}</p>}
        </div>
      </main>
    </div>
  );
}
export default Enrollment;