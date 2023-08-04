import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import the useLocation hook
import Image from './background.jpeg';

function ControlPanel() {
 const backgroundStyle = {
  backgroundImage: `url(${Image})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
};


  const location = useLocation(); // Get the current location from the useLocation hook

  const tabStyles = {
    // Add the CSS styles for the tabs here
    /* Styling for tabs */
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const tabsColumnStyles = {
    // Add the CSS styles for the tabs column here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const tabStylesCommon = {
    // Add the common CSS styles for the tabs here
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    transition: 'background-color 0.3s ease',
    width: '300px', // Decreased the width of the tabs to 200px
    height: '50px', // Decreased the height of the tabs to 100px
    textAlign: 'center',
  };

  const tabStylesHover = {
    // Add the CSS styles for the tabs on hover here
    backgroundColor: '#e0e0e0',
  };

  const tabTitleStyles = {
    // Add the CSS styles for the tab titles here
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const descriptionStyles = {
    // Add the CSS styles for the tab descriptions here
    fontSize: '10px',
    color: '#555',
  };

  return (
    <div className='ControlPanel' style={backgroundStyle}>
      <div className='tabContainer' style={tabStyles}>
        <div className='tabsColumn' style={tabsColumnStyles}>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/enrollments' && tabStylesHover) }}
          >
            <Link to='/enrollments' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Student Enrollment
              </div>
              <div className='description' style={descriptionStyles}>
                Registration of courses
              </div>
            </Link>
          </div>
          
          <div
  className='tab'
  style={{ ...tabStylesCommon, ...(location.pathname === '/studentdetails' && tabStylesHover) }}
>
  <Link to='/homepage/studentdetails' className='tabLink'>
    <div className='tabTitle' style={tabTitleStyles}>
      Student Details
    </div>
    <div className='description' style={descriptionStyles}>
      Academic info of student
    </div>
  </Link>
</div>

          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/users' && tabStylesHover) }}
          >
            <Link to='/management/users' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                User Management
              </div>
              <div className='description' style={descriptionStyles}>
                User Account details
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/Role' && tabStylesHover) }}
          >
            <Link to='/management/Role' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Role Management
              </div>
              <div className='description' style={descriptionStyles}>
                Role Details
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/advisor' && tabStylesHover) }}
          >
            <Link to='/institutions' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Institutions
              </div>
              <div className='description' style={descriptionStyles}>
                Institution Details
              </div>
            </Link>
          </div>
        </div>
        <div className='tabsColumn' style={tabsColumnStyles}>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/Course' && tabStylesHover) }}
          >
            <Link to='/management/Course' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Course Management
              </div>
              <div className='description' style={descriptionStyles}>
                Course Details
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/teacher' && tabStylesHover) }}
          >
            <Link to='/management/teacher' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Teacher Management
              </div>
              <div className='description' style={descriptionStyles}>
                Teacher Details
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/Gradebook' && tabStylesHover) }}
          >
            <Link to='/Gradebook' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Gradebook
              </div>
              <div className='description' style={descriptionStyles}>
                Exam Results
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/Reports' && tabStylesHover) }}
          >
            <Link to='/Reports' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Reports
              </div>
              <div className='description' style={descriptionStyles}>
                Student Statistics
              </div>
            </Link>
          </div>
          <div
            className='tab'
            style={{ ...tabStylesCommon, ...(location.pathname === '/management/advisor' && tabStylesHover) }}
          >
            <Link to='/management/advisor' className='tabLink'>
              <div className='tabTitle' style={tabTitleStyles}>
                Advisory Management
              </div>
              <div className='description' style={descriptionStyles}>
                Advisor Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
