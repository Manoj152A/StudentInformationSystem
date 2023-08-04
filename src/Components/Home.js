import React, { useState } from "react";
import Calendar from "react-calendar";
import "../CSS/Home.css";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const currentDay = selectedDate.toLocaleString("default", { weekday: "long" });
  const currentMonth = selectedDate.toLocaleString("default", { month: "long" });
  const currentYear = selectedDate.getFullYear();

  const currentTime = selectedDate.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="Home">
      <div className="CalendarContainer">
        <h3>Calendar</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="CustomCalendar"
        />
        <div className="CalendarInfo">
          <p>Selected Date: {currentDay}, {currentMonth} {selectedDate.getDate()}, {currentYear}</p>
          <p>Current Time: {currentTime}</p>
        </div>
      </div>

      <div className="ContentContainer">
        <h2>Welcome to the Student Information System</h2>
        <p>
          Here you can access various features and information related to the students enrolled in the institution.
        </p>
      </div>
    </div>
  );
};

export default Home;
