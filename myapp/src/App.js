import React, { useState } from "react";
import MainContent from "./MainContent";
import Header from "./Header";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("enrollment");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleNextTab = (tabName) => {
    // Logic to update the activeTab to the next tab
    handleTabClick(tabName);
  };

  return (
    <div>
      <Header style={{ textAlign: "center" }} title="Student Enrollment Form" />
      <MainContent
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        handleNextTab={handleNextTab}
      />
    </div>
  );
};

export default App;
