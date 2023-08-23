import React from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import { HashRouter as Router, Route, Link } from "react-router-dom";

const EmployeeInfo = (props) => {
    const {onBack,data} = props
  return (
    <div>
        <div onClick={
            onBack
          // console.log("back1")
          }>    <Button
          variant="primary"
          id="add-button"
          
        >
          Back
        </Button></div>
     

        <h2 id="role-title">Employee Information of {data["FirstName"]+" "+data["LastName"]}</h2>
        <div id="outer-empingo-div">
        <Link to="/hr/employee/info/personal-info">
          <Button
            variant="outline-primary"
            size="lg"
            block
            className="empinfo-button"
          >
          
            Personal Information
          </Button>
          </Link>
          <Link to="/hr/employee/info/education">
          <Button
            variant="outline-primary"
            size="lg"
            block
            className="empinfo-button"
          >
            Education
          </Button>
          </Link>
          <Link to="/hr/employee/info/family-info">
          <Button
            variant="outline-primary"
            size="lg"
            block
            className="empinfo-button"
          >
            Dependents
          </Button>
          </Link>
          <Link to="/hr/employee/info/work-experience">
          <Button
            variant="outline-primary"
            size="lg"
            block
            className="empinfo-button"
          >
            Work Experience
          </Button>
          </Link>
        </div>

    </div>
  )
}

export default EmployeeInfo
