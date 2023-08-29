import React, { useState } from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";

import Role from "../Role";
import NavBar from "../NavBar";
import RoleForm from "../RoleForm";
import Position from "../Position";
import Department from "../Department";
import AdminPortal from "./AdminPortal";
import AdminProjectBid from "./AdminProjectBid";
import NotFound404 from "../NotFound404";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks
} from "@fortawesome/free-solid-svg-icons";

const DashboardAdmin = () => {
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
            checked:false
        }))
      }
  return (
    <Router>
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar loginInfo={this.props.data} checked={this.state.checked} handleChange={this.handleChange} onLogout={this.props.onLogout}/>
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" /> 
                    Role 
                  </Link> 
                </li>
                <li>
                  <Link to="/admin/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" /> 
                    Position 
                  </Link> 
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    /> 
                    Department 
                  </Link> 
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    /> 
                    Project Bidding 
                  </Link> 
                </li>
                <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" /> 
                    Portal Master 
                  </Link> 
                </li>
                
              </ul>
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* //table */}
              {/* <RoleAdmin/> */}
              <Switch>
                <Route exact path="/admin/role" component={Role} />
                {/* <Route path="/admin/role/form" exact component={RoleFormF} /> */}
                <Route
                  path="/admin/position"
                  exact
                  component={Position}
                />
                <Route
                  path="/admin/department"
                  exact
                  component={Department}
                />
                 <Route
                  path="/admin/portal-master"
                  exact
                  component={AdminPortal}
                />
                 <Route
                  path="/admin/project-bid"
                  exact
                  component={AdminProjectBid}
                />
                {/* <Route
                  exact
                  path="/admin"
                  render={() => <Redirect to="/admin/role" />}
                /> */}
                <Route element={() => 
<NotFound404/>
                  // <Redirect to="/admin/role" />
                } />
              </Switch>
            </div>
          </div>
        </div>
      </Router>

  )
}

export default DashboardAdmin
