import React from "react";
import StudentEnrollment from "./StudentEnrollment";
import ParentDetails from "./ParentDetails";
import SiblingDetails from "./SiblingDetails";
import Academy from "./Academy";

const MainContent = ({ activeTab, handleTabClick, handleNextTab }) => {
  const contentTextStyle = {
    flex: 2,
    border: "1px solid black",
    padding: "10px",
  };

  const handleNext = () => {
    // Logic to move to the next tab
    if (activeTab === "enrollment") {
      handleNextTab("parent");
    } else if (activeTab === "parent") {
      handleNextTab("sibling");
    } else if (activeTab === "sibling") {
      handleNextTab("academy");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "enrollment":
        return <StudentEnrollment />;
      case "parent":
        return <ParentDetails />;
      case "sibling":
        return <SiblingDetails />;
      case "academy":
        return <Academy />;
      default:
        return null;
    }
  };

  return (
    <div className="main-content-container">
      <div className="tabs-container">
        <button
          className={
            activeTab === "enrollment" ? "tab-button active-tab" : "tab-button"
          }
          onClick={() => handleTabClick("enrollment")}
        >
          Student Enrollment
        </button>
        <button
          className={
            activeTab === "parent" ? "tab-button active-tab" : "tab-button"
          }
          onClick={() => handleTabClick("parent")}
        >
          Parent Details
        </button>
        <button
          className={
            activeTab === "sibling" ? "tab-button active-tab" : "tab-button"
          }
          onClick={() => handleTabClick("sibling")}
        >
          Sibling Details
        </button>
        <button
          className={
            activeTab === "academy" ? "tab-button active-tab" : "tab-button"
          }
          onClick={() => handleTabClick("academy")}
        >
          Academy
        </button>
      </div>
      <div style={contentTextStyle}>
        {renderTabContent()}
        {activeTab !== "academy" && <button onClick={handleNext}>Next</button>}
      </div>
    </div>
  );
};

export default MainContent;
