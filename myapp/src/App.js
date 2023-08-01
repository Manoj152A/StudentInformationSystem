// App.js
import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Main from './Main';
import StudentDetails from './StudentDetails';
import ScheduleSearch from './ScheduleSearch'

function App() {
  return (
    <Router>
      <div>
        <Header title="Student Information System" />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/schedule-search" element={<ScheduleSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
