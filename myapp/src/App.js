import React, { useState } from "react";
import MainContent from "./MainContent";
import Header from "./Header";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentEnrollment from "./StudentEnrollment";
import ParentDetails from "./ParentDetails";
import SiblingDetails from "./SiblingDetails";

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
      <Header title="Student Enrollment Form" />
      <MainContent
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        handleNextTab={handleNextTab}
      />
      <Router>
        <Switch>
          <Route exact path="/" component={StudentEnrollment} />
          <Route path="/ParentDetails/:studentId" component={ParentDetails} />
          <Route path="/SiblingDetails/:studentId" component={SiblingDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
