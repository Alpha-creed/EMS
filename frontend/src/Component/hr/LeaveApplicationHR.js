import React, { useState } from 'react'
import axios from "axios";
import LeaveApplicationHRTable from "./LeaveApplicationHRTable";
// import LeaveApplicationHRForm from "./LeaveApplicationHRForm.jsx";
import LeaveApplicationHRFormEdit from "./LeaveApplicationHRFormEdit";

const LeaveApplicationHR = ({data}) => {
    const [values,setValues]  =useState({
        table: true,
        editForm: false,
        editData: {},
    })
   const handleLeaveApplicationHRSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
                ...prevState,
                table: true
            }))
    
        let body = {
    
          //  CompanyName: event.target[0].value,
          //  Designation:  event.target[1].value,
          //  FromDate:  event.target[2].value,
          //  ToDate:  event.target[3].value,
    
          Leavetype: event.target[0].value,
          FromDate: event.target[1].value,
          ToDate: event.target[2].value,
          Reasonforleave: event.target[3].value,
          Status: event.target[4].value,
        };
        axios
          .post("http://localhost:5000/api/add-leave-application-emp/" + data["_id"], body, {
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
     const handleAddLeaveApplicationHR = () => {
        console.log("clicked1");
        setValues((prevState)=>({
                ...prevState,
                table: false,
            }))
      };
     const handleEditLeaveApplicationHR = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
                ...prevState,
                editForm: true,
                editData: e,
                editFormGender: e["Gender"]
            }))
      };
     const handleFormClose = () => {
        console.log("clicked1");
        setValues((prevState)=>({
                ...prevState,
                table: true
            }))
      };
     const handleEditFormClose = () => {
        console.log("clicked5");
        setValues((prevState)=>({
                ...prevState,
                editForm: false 
            }))
      };
      // handleFormClose = () => {
      //   console.log("clicked1");
      //   this.setState({ table: true });
      // };
      const handleLeaveApplicationHREditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
          Status: newInfo.target[4].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-leave-application-hr/" + info["_id"],
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
          setValues((prevState)=>({
            ...prevState,
            editForm: false
        }))
      };
  return (
    <>
         {/* <h1>iiiiiiiiiinnnnnnnnnnnnnn{
          JSON.stringify(this.props.data)}</h1> */}

{values.table ? (
          values.editForm ? (
            <LeaveApplicationHRFormEdit
              onLeaveApplicationHREditUpdate={handleLeaveApplicationHREditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <LeaveApplicationHRTable
                onAddLeaveApplicationHR={handleAddLeaveApplicationHR}
                onEditLeaveApplicationHR={handleEditLeaveApplicationHR}
                data={data}
              />
            )
        ) : (
            <div></div>
            //   <LeaveApplicationHRForm
            //     onLeaveApplicationHRSubmit={this.handleLeaveApplicationHRSubmit}
            //     onFormClose={this.handleFormClose}
            //     onGenderChange={this.handleAddFormGenderChange}
            //   />
          )}
     
    </>
  )
}

export default LeaveApplicationHR
