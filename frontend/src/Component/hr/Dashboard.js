import React, { useState } from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar";
import RoleForm from "../RoleForm";
import Position from "../Position";
import Department from "../Department";
import Country from "../Country";
import State from "../State";
import City from "../City";
import Company from "../Company";
import Employee from "../Employee";
import Salary from "../Salary";
import LeaveApplicationHR from "./LeaveApplicationHR";
import NotFound404 from "../NotFound404";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChair,
  faBuilding,
 faUser,
faUserTie,
faRupeeSign,
faFileAlt,
faCity,
faGlobeAmericas,
faPlaceOfWorship,
faArchway,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeForm from '../EmployeeForm.js';


const Dashboard = ({data,onLogout}) => {
    const [values,setValues] = useState({
        redirect: true,
    checked: true 
    })
    
   const handleChange=(checked)=> {
        console.log("switch");
        // var sidebarV = this.refs.sidebar;
        // var sidebarV = React.findDOMNode( this.refs.sidebar);
        // sidebarV.style.disply="none";
        
        if(values.checked==true){ 
           // document.getElementById("sidebar").setAttribute("style", "display:none")
          document.getElementById("sidebar").setAttribute("class", "display-none");
        }
        // document.getElementById("sidebar").setAttribute("style", "display:block");
        else{document.getElementById("sidebar").setAttribute("class", "display-block");}   
        setValues((prevState)=>({
            ...prevState,
            checked//if doenst work shift to checked = false
        }))
      }
    

  return (
    <Router>
     {/* <Redirect to='/login'  /> */}

     <div id="outer-main-div">
     <div id="outer-nav">
       {/* <NavBar loginInfo={this.props.data} /> */}
       <NavBar loginInfo={data} checked={values.checked} handleChange={handleChange} onLogout={onLogout}/>

     </div>

     <div id="main-non-nav">
       <div id="sidebar">
         <div id="sidebar-top-content" />
         <div id="main-title">
           <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
           HR
         </div>
         <ul className="navbar-ul">
           <li>
             <Link to="/hr/employee">
               <FontAwesomeIcon icon={faUser} className="sidebar-icon" /> 
               User 
             </Link> 
           </li>
           <li>
             <Link to="/hr/salary">
               <FontAwesomeIcon icon={faRupeeSign} className="sidebar-icon" /> 
               Salary 
             </Link> 
           </li>
           <li>
             <Link to="/hr/leave-application-hr">
               <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" /> 
               Leave Application 
             </Link> 
           </li>
           <li>
             <Link to="/hr/company">
               <FontAwesomeIcon icon={faCity} className="sidebar-icon" /> 
               company 
             </Link> 
           </li>
           <li>
             <Link to="/hr/role">
               <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
               Role 
             </Link> 
           </li>
           <li>
             <Link to="/hr/position">
               <FontAwesomeIcon icon={faChair} className="sidebar-icon" /> 
               Position 
             </Link> 
           </li>
           <li>
             <Link to="/hr/department">
               <FontAwesomeIcon
                 icon={faBuilding}
                 className="sidebar-icon"
               /> 
               Department 
             </Link> 
           </li>
           <li>
             <Link to="/hr/country">
               <FontAwesomeIcon icon={faGlobeAmericas} className="sidebar-icon" /> 
               Country 
             </Link> 
           </li>
           <li>
             <Link to="/hr/state">
               <FontAwesomeIcon icon={faPlaceOfWorship} className="sidebar-icon" /> 
               State 
             </Link> 
           </li>
           <li>
             <Link to="/hr/city">
               <FontAwesomeIcon icon={faArchway} className="sidebar-icon" /> 
               City 
             </Link> 
           </li>
           <li>
            
           </li>
           {/* <li> <a href=""><FontAwesomeIcon icon={faChair} className="sidebar-icon"/> Position</a>   </li> */}
           {/* <li> <a href=""><FontAwesomeIcon icon={faBuilding} className="sidebar-icon"/> Department</a>   </li> */}
           {/* <li> <a href=""><FontAwesomeIcon icon={faDollarSign} className="sidebar-icon"/> Project Bidding</a>   </li> */}
           {/* <li> <a href=""><FontAwesomeIcon icon={faTasks} className="sidebar-icon"/> Portal Master</a>   </li> */}
         </ul>
       </div>
       {/* <div id="sidebar-top-content" /> */}
       <div id="main-area">
         <div id="sidebar-top-content" />
         {/* //table */}
         {/* <RoleHR/> */}
         <Routes>
           <Route
             path="/hr/employee"
             // exact
             component={Employee}
           />
           <Route
             path="/hr/salary"
             exact
             component={Salary}
           />
           <Route
             path="/hr/company"
             exact
             component={Company}
           />
           <Route path="/hr/role" component={Role} />
           {/* <Route path="/hr/role/form" exact component={RoleFormF} /> */}
           <Route
             path="/hr/position"
             exact
             component={Position}
           />
           <Route
             path="/hr/department"
             exact
             component={Department}
           />
           <Route
             path="/hr/country"
             exact
             component={Country}
           />
           <Route
             path="/hr/state"
             exact
             component={State}
           />
           <Route
             path="/hr/city"
             exact
             component={City}
           />
           <Route
             path="/hr/leave-application-hr"
             exact
             component={LeaveApplicationHR}
           />
            {/* <Route
             path="/hr/portal-master"
             exact
             component={HRPortalF}
           /> */}
            {/* <Route
             path="/hr/project-bid"
             exact
             component={HRProjectBidF}
           /> */}
           {/* <Route
             exact
             path="/hr"
             render={() => <Redirect to="hr/employee" />}
           /> */}
           <Route render={() => <NotFound404/>} />
           
         </Routes>
       </div>
     </div>
   </div>
 </Router>
  )
}

export default Dashboard
