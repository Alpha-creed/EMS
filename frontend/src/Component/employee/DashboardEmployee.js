import React, { useState } from 'react'
import { HashRouter as Router, Route, Link,Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import FamilyInfo from "./FamilyInfo";
import WorkExperience from "./WorkExperience";
import LeaveApplicationEmp from "./LeaveApplicationEmp";
import NotFound404 from "../NotFound404";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
 faUser,
faFileAlt,
faUniversity,
faBriefcase,
faMale,
} from "@fortawesome/free-solid-svg-icons";


const DashboardEmployee = ({data,onLogout}) => {
    const [redirect,setRedirect] = useState(true)
    const [checked,setChecked] = useState(true)

   const handleChange=(checked)=> {
        console.log("switch");
        // var sidebarV = this.refs.sidebar;
        // var sidebarV = React.findDOMNode( this.refs.sidebar);
        // sidebarV.style.disply="none";
        
        if(checked==true){ 
           // document.getElementById("sidebar").setAttribute("style", "display:none")
          document.getElementById("sidebar").setAttribute("class", "display-none");
        }
        // document.getElementById("sidebar").setAttribute("style", "display:block");
        else{document.getElementById("sidebar").setAttribute("class", "display-block");}   
        setChecked(false)
      }
    

  return (
    <Router>
    {/* <Redirect to='/login'  /> */}

    <div id="outer-main-div">
      <div id="outer-nav">
        {/* <NavBar loginInfo={this.props.data} /> */}
        <NavBar
          loginInfo={data}
          checked={checked}
          handleChange={handleChange}
          onLogout={onLogout}
        />
      </div>

      <div id="main-non-nav">
        <div id="sidebar">
          <div id="sidebar-top-content" />
          <div id="main-title" className="main-title-employee">
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            Employee
          </div>
          <ul className="navbar-ul">
            <li>
              <Link
                to={
                  "/employee/" +
                  data["_id"] +
                  "/personal-info"
                }
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="sidebar-icon"
                />
                Personal Information
              </Link>
            </li>
            <li>
              <Link
                to={
                  "/employee/" + data["_id"] + "/education"
                }
              >
                <FontAwesomeIcon
                  icon={faUniversity}
                  className="sidebar-icon"
                />
                Education
              </Link>
            </li>
            <li>
              <Link to={
                  "/employee/" + data["_id"] + "/family-info"
                }>
                <FontAwesomeIcon
                  icon={faMale}
                  className="sidebar-icon"
                />
                Dependents
              </Link>
            </li>
            <li>
              <Link to={
                  "/employee/" + data["_id"] + "/work-experience"
                }>
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="sidebar-icon"
                />
                WorkExp
              </Link>
            </li>
            <li>
              <Link to={
                  "/employee/" + data["_id"] + "/leave-application-emp"
                }>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="sidebar-icon"
                />
                Leave Application
              </Link>
            </li>
          </ul>
        </div>
        {/* <div id="sidebar-top-content" /> */}
        <div id="main-area">
          <div id="sidebar-top-content" />
          {/* //table */}
          {/* <RoleHR/> */}
          <Routes>
            {/* <Route
              path="/employee/:id/personal-info"
              exact
              component={PersonalInfoF}
            /> */}
            <Route
              exact
              path="/employee/:id/personal-info"
              element={ <PersonalInfo data={data} back={false}/>}
            />
            <Route
              exact
              path="/employee/:id/education"
              element={ <Education data={data} back={false}/>}
            />
            <Route
              exact
              path="/employee/:id/family-info"
              element={<FamilyInfo data={data} back={false}/>}
            />
            <Route
              exact
              path="/employee/:id/work-experience"
              element={<WorkExperience data={data} back={false}/>}
            />
            <Route
              exact
              path="/employee/:id/leave-application-emp"
              element={ <LeaveApplicationEmp data={data} />}
            />
           
            {/* <Route
              exact
              path="/employee"
              render={() => (
                <Redirect
                  to={
                    "/employee/" +
                    this.props.data["_id"] +
                    "/personal-info"
                  }
                />
              )}
            /> */}
            <Route
              element={
                () => <NotFound404/>
                // <Redirect to={"/employee/"+ this.props.data["_id"]+"/personal-info"} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  </Router>

  )
}

export default DashboardEmployee
