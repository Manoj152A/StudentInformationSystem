import React, { useState } from "react";
import StudentEnrollment from "./StudentEnrollment";
import ParentDetails from "./ParentDetails";
import SiblingDetails from "./SiblingDetails";
import Academy from "./Academy";
import Image from "../images/background.jpeg";

const tabComponents = {
  enrollment: StudentEnrollment,
  parent: ParentDetails,
  sibling: SiblingDetails,
  academy: Academy,
};
const StudentCreation = () => {
  const [activeTab, setActiveTab] = useState("enrollment");
  const [studentId, setStudentId] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleNextTab = (nextTab) => {
    setActiveTab(nextTab);
  };

  const contentTextStyle = {
    flex: 4,
    border: "1px solid black",
    padding: "10px",
  };

  const handleNext = (newStudentId) => {
    setStudentId(newStudentId);

    if (activeTab === "enrollment") {
      handleNextTab("parent");
    } else if (activeTab === "parent") {
      handleNextTab("sibling");
    } else if (activeTab === "sibling") {
      handleNextTab("academy");
    }
  };

  const TabContent = tabComponents[activeTab]; // Get the component based on the active tab

  const StudentCreationContainerStyle = {
    display: "flex",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    alignItems: "flex-start",
  };

  const tabsContainerStyle = {
    flex: 1,
    paddingRight: "30px",
  };

  const tabButtonStyle = {
    display: "-webkit-box",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid black",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    cursor: "pointer",
    outline: "none",
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bolder",
    color: "black",
  };

  const activeTabStyle = {
    backgroundColor: "grey",
  };

  return (
    <div
      className="student-creation-container"
      style={StudentCreationContainerStyle}
    >
      <div className="tabs-container" style={tabsContainerStyle}>
        {Object.keys(tabComponents).map((tabName) => (
          <button
            key={tabName}
            className={activeTab === tabName ? "active-tab" : ""}
            style={activeTab === tabName ? activeTabStyle : tabButtonStyle}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName === "enrollment"
              ? "Student Enrollment"
              : tabName === "parent"
              ? "Parent Details"
              : tabName === "sibling"
              ? "Sibling Details"
              : tabName === "academy"
              ? "Academy"
              : ""}
          </button>
        ))}
      </div>
      <div style={contentTextStyle}>
        {TabContent ? (
          <TabContent onNext={handleNext} studentId={studentId} />
        ) : (
          <p>No tab content available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentCreation;
