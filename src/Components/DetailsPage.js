import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../images/background.jpeg';


const DetailsPage = () => {
  const backgroundStyle = {
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
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
    <main style={backgroundStyle}>
    <div className="details-container">
      <h2 className="details-heading">Details</h2>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : detailsData ? (
        <div>
          <p className="details-item">
            <span className="details-label">Institution :</span> {detailsData.institution_name}
          </p>
          <p className="details-item">
            <span className="details-label">Name        :</span> {detailsData.firstname}
          </p>
          <p className="details-item">
            <span className="details-label">Password    :</span> {detailsData.user_password}
          </p>
          <p className="details-item">
            <span className="details-label">Role        :</span> {detailsData.role_name}
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