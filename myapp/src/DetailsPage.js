import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import backgroundImage from './images.jpg';


const DetailsPage = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    /* Add any other styles you want for the container */
    width: '100%',
    height: '600px',
  };
  const { detailsId } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const response = await fetch(`http://localhost:8089/details?details=${detailsId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetailsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false);
        // Handle any error scenarios if needed
      }
    };

    fetchDetailsData();
  }, [detailsId]);

  return (
    <main style={containerStyle}>
    <div className="details-container">
      <h2 className="details-heading">Details</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : detailsData ? (
        <div>
          <p className="details-item">
            <span className="details-label">Institution :</span> {detailsData.institution}
          </p>
          <p className="details-item">
            <span className="details-label">Name        :</span> {detailsData.firstname}
          </p>
          <p className="details-item">
            <span className="details-label">Password    :</span> {detailsData.password}
          </p>
          <p className="details-item">
            <span className="details-label">Role        :</span> {detailsData.role}
          </p>
          <p className="details-item">
            <span className="details-label">Email       :</span> {detailsData.email}
          </p>
          <p className="details-item">
            <span className="details-label">Username    :</span> {detailsData.username}
          </p>
          <p className="details-item">
            <span className="details-label">Status      :</span> {detailsData.status}
          </p>
        </div>
      ) : (
        <p className="no-data-message">No data available</p>
      )}
    </div>
    </main>
  );
};

export default DetailsPage;