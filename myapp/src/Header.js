import React from 'react';

function Header({ title }) {
  const headerStyle = {
    backgroundColor: '#00f2ff', // Set the background color to blue
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    textAlign: 'center',
    zIndex: 1, // Add a higher z-index to keep the header above other content
    width: '100%', // Set the width to cover the full width of the header container
  };

  return (
    <div style={headerStyle}>
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
