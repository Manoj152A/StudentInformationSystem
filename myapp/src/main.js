import React, { useState, useEffect } from 'react';
import backgroundImage from './images.jpg';
import { useNavigate } from 'react-router-dom';
import './App.css';


const MainComponent = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    /* Add any other styles you want for the container */
    width: '100%',
    height: '600px',
  };

  const [textInput, setTextInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [noUsersAvailable, setNoUsersAvailable] = useState(false);
  const navigate = useNavigate();


  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Perform the API call here with the selected institution and filter
      const response = await fetch(
        `http://localhost:8089/users/${textInput}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check if data is an array (multiple results) or an object (single result)
      if (Array.isArray(data)) {
        if (data.length === 0) {
          // When no users are available, set the noUsersAvailable state to true
          setNoUsersAvailable(true);
          setSearchResults([]); // Clear the search results
          return;
        }
        setNoUsersAvailable(false);
        setSearchResults(data); // Store the array of results in the state
      } else {
        setNoUsersAvailable(false);
        setSearchResults([data]); // Convert the single result to an array and store in the state
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle any error scenarios if needed
    }
  };

  // Fetch institutions data from the API
  useEffect(() => {
    const fetchInstitutionsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/institutions/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Extract institution names from the response and set in the state
        const institutionNames = data.map((institution) => institution.name);
        setInstitutions(institutionNames);
      } catch (error) {
        console.error('Error fetching institutions data:', error);
      }
    };

    fetchInstitutionsData();
  }, []);

  const handleDetailsClick = async (detailsValue) => {
    try {
      const response = await fetch(`http://localhost:8089/details?details=${detailsValue}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Handle the data and navigate to the new page with the fetched data.
      // Use the useHistory hook to navigate programmatically.
      console.log('Data from the second API:', data);
      // Replace '/details' with the actual path of your DetailsPage component
      navigate(`/details/${detailsValue}`);
      // Navigate to the new page
    } catch (error) {
      console.error('Error fetching details:', error);
      // Handle any error scenarios if needed
    }
  };

  return (
    <main style={containerStyle}>
      <div>
        <label htmlFor="institutionDropdown">Select Institution:</label>
        <select
          id="institutionDropdown"
          value={selectedInstitution}
          onChange={(e) => setSelectedInstitution(e.target.value)}
        >
          <option value="">Select an institution</option>
          {institutions.map((institution, index) => (
            <option key={index} value={institution}>
              {institution}
            </option>
          ))}
        </select>

        <label htmlFor="filterDropdown" className="whatever">Select Filter:</label>
        <select
          id="filterDropdown"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="">Select a filter</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="name">Name</option>
        </select>

        <label htmlFor="textInput" className="whatever">Enter Text to Search:</label>
        <input
          type="text"
          id="textInput"
          value={textInput}
          onChange={handleTextInputChange}
          placeholder="Enter text here"
        />

        <button onClick={handleSearch} className="whatever">Search</button> <button>Create</button>
      </div>
      {/* Display the search results as a table or "No users available" */}
      {noUsersAvailable ? (
        <div>
          <p>No users available</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="table-container">
          <h2>Search Results:</h2>
          <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Status</th>
                <th className="details-cell">Details</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.firstname}</td>
                  <td>{result.email}</td>
                  <td>{result.username}</td>
                  <td>{result.status}</td>
                  {/* Replace the "Details" column value with the icon */}
                  <td className="details-cell">
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDetailsClick(result.details)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default MainComponent;
