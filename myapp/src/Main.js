// Main.js
import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <main>
      <div className="step">
        <Link to="/student-details">
          <button>Student Details</button>
        </Link>
        <Link to="/schedule-search">
          <button>Schedule Search</button>
        </Link>
      </div>
      {/* ... other steps ... */}
    </main>
  );
}

export default Main;
