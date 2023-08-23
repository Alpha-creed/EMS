import React, { useState } from 'react'
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import EmployeeFormEdit from "./EmployeeFormEdit";
import EmployeeInfo from "./EmployeeInfo";
import { HashRouter as Router, Route } from "react-router-dom";
import PersonalInfo from "./employee/PersonalInfo";
import Education from "./employee/Education";
import FamilyInfo from "./employee/FamilyInfo";
import WorkExperience from "./employee/WorkExperience";


const Employee = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {},
        addFormGender: "",
        editFormGender: "",
        EmpInfo: {},
        EmpInfoBool: false,
    })
   const handleEmpInfo = e => {
        console.log("info", e);
        // history.push("/hr/employee/form-edit");
        setValues((prevState)=>({
            ...prevState,
            EmpInfo: e,
            EmpInfoBool: true 
        }))
      };
     const handleBack = () => {
        console.log("back");
        setValues((prevState)=>({
            ...prevState,
            EmpInfoBool: false
        }))
      };
     const handleEmployeeSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))
    
        let body = {
          Email: event.target[0].value,
          Password: event.target[1].value,
          Account: event.target[2].value,
          RoleID: event.target[3].value,
          Gender: values.addFormGender,
          FirstName: event.target[6].value,
          MiddleName: event.target[7].value,
          LastName: event.target[8].value,
          DOB: event.target[9].value,
          ContactNo: event.target[10].value,
          EmployeeCode: event.target[11].value,
          DepartmentID: event.target[12].value,
          PositionID: event.target[13].value,
          DateOfJoining: event.target[14].value,
          TerminateDate: event.target[15].value,
        };
        axios
          .post("http://localhost:5000/api/add-employee", body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            setValues((prevState)=>({
                ...prevState,
                table: false,
                table: true
            }))
          })
          .catch(err => {
            console.log(err);
          });
      };
      const handleAddEmployee = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false
        }))
      };
     const handleEditEmployee = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
            ...prevState,
            editForm: true,
            editData: e,
            editFormGender: e["Gender"] 
        }))
      };
      
     const handleEditFormClose = () => {
        console.log("clicked5");
        setValues((prevState)=>({
            ...prevState,
            editForm: false 
        }))
      };
    const handleFormClose = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))
      };
     const handleEmployeeEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        let body = {
          Email: newInfo.target[0].value,
          // Password: newInfo.target[1].value,
          Account: newInfo.target[1].value,
          RoleID: newInfo.target[2].value,
          Gender: values.editFormGender,
          FirstName: newInfo.target[5].value,
          MiddleName: newInfo.target[6].value,
          LastName: newInfo.target[7].value,
          DOB: newInfo.target[8].value,
          ContactNo: newInfo.target[9].value,
          EmployeeCode: newInfo.target[10].value,
          DepartmentID: newInfo.target[11].value,
          PositionID: newInfo.target[12].value,
          DateOfJoining: newInfo.target[13].value,
          TerminateDate: newInfo.target[14].value,
        };
        console.log("update", body); 
        axios
          .put(
            "http://localhost:5000/api/update-employee/" + info["_id"],
            body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
          )
          .then(res => {
            setValues((prevState)=>({
                ...prevState,
                table: false,
                table: true
            }))
          })
          .catch(err => {
            console.log(err);
          });
    
        this.setState({ editForm: false });
        setValues((prevState)=>({
            ...prevState,
            editForm: false
        }))
      };
      handleAddFormGenderChange = (e) => {
        // console.log(e.currentTarget.value);
       
        setValues((prevState)=>({
            ...prevState,
            addFormGender: e.currentTarget.value
        }))
    
      };
      handleEditFormGenderChange = (e) => {
        // console.log(e.currentTarget.value);
        // console.log("ggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnn")
        setValues((prevState)=>({
            ...prevState,
            editFormGender: e.currentTarget.value
        }))
    
      };
    
  return (
    <Router>
        <Route
          exact
          path="/hr/employee"
          element={props =>
            <React.Fragment>
              {/* {this.redirectF} */}
              {/* {this.state.EmpInfo?this.redirectF:<React.Fragment />} */}
              {values.table ? (
                values.editForm ? (
                  <EmployeeFormEdit
                    onEmployeeEditUpdate={handleEmployeeEditUpdate}
                    onFormEditClose={handleEditFormClose}
                    editData={values.editData}
                    onGenderChange={handleEditFormGenderChange}
                  />
                ) : (


                    !values.EmpInfoBool ? <EmployeeTable
                      onAddEmployee={handleAddEmployee}
                      onEditEmployee={handleEditEmployee}
                      onEmpInfo={handleEmpInfo}
                    /> : <EmployeeInfo data={values.EmpInfo} onBack={handleBack} />

                  )
              ) : (
                  <EmployeeForm
                    onEmployeeSubmit={handleEmployeeSubmit}
                    onFormClose={handleFormClose}
                    onGenderChange={handleAddFormGenderChange}
                  />
                )}
            </React.Fragment>
          }
        />
 
        {/* <Route
                   exact
                   path="/hr/employee/info"
                   render={props => <EmployeeInfo data={this.state.EmpInfo} onBack={this.handleBack}/>}
                 /> */}
        <Route
          exact
          path="/hr/employee/info/personal-info"
          render={props => <PersonalInfo data={values.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/education"
          render={props => <Education data={values.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/family-info"
          render={props => <FamilyInfo data={values.EmpInfo} back={true} />}
        />
        <Route
          exact
          path="/hr/employee/info/work-experience"
          render={props => <WorkExperience data={values.EmpInfo} back={true} />}
        />


      </Router>
  )
}

export default Employee
