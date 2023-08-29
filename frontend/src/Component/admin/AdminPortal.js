import React, { useState } from 'react'
import axios from "axios";
import AdminPortalTable from "./AdminPortalTable";
import AdminPortalForm from "./AdminPortalForm";
import AdminPortalFormEdit from "./AdminPortalFormEdit";

const AdminPortal = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {},
        addFormStatus: "",
        editFormStatus: ""
    })

   const handlePortalSubmit = event => {
        event.preventDefault();
        console.log("portal", event.target[0].value, event.target[1].value, event.target[2].value);
        console.log("portal status", this.state.addFormStatus);
        setValues((prevState)=>({
            ...prevState,
            table: true        
        }))
    
        let body = {
          PortalName: event.target[0].value,
          Status: this.state.addFormStatus
        };
        //  let body= "CompanyID=" + event.target[0].value + "&Portal=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/admin/add-portal", body, {
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
        // this.setState({ loading: true });
        // this.login(event.target[0].value, event.target[1].value);
        // event.target.reset();
      };
     const handleAddPortal = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false       
        }))
      };
      const handleEditPortal = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
            ...prevState,
            editForm: true,
            editData: e,
            editFormStatus: e["Status"]       
        }))
      };
    // const  handleFormClose = () => {
    //     console.log("clicked1");
    //     setValues((prevState)=>({
    //         ...prevState,
    //         table: true        }))
    //   };
     const handleEditFormClose = () => {
        console.log("clicked5");
        setValues((prevState)=>({
            ...prevState,
            editForm: false       }))
      };
     const handleFormClose = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: true 
      }))
      };
    const handleAddFormStatusChange = (e) => {
        // console.log(e.currentTarget.value);
 
        setValues((prevState)=>({
            ...prevState,
            addFormStatus: e.currentTarget.value
      }))
    
      };
     const handleEditFormStatusChange = (e) => {
        // console.log(e.currentTarget.value);
        setValues((prevState)=>({
            ...prevState,
            editFormStatus: e.currentTarget.value 
          }))
    
      };
     const handlePortalEditUpdate = (info, formData1) => {
        // this.setState({ table: true });
        let body = {
          // ...info,CompanyID:formData1,Portal:formData2
          _id: info["_id"],
          PortalName: formData1,
          Status: this.state.editFormStatus,
          ID: info["ID"],
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/admin/update-portal/" + info["ID"], body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            // this.componentDidMount();
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
      {values.table ? (
          values.editForm ? (
            <AdminPortalFormEdit
              onPortalEditUpdate={handlePortalEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
              onStatusChange={handleEditFormStatusChange}
            />
          ) : (
              <AdminPortalTable
                onAddPortal={handleAddPortal}
                onEditPortal={handleEditPortal}
              />
            )
        ) : (
            <AdminPortalForm
              onPortalSubmit={handlePortalSubmit}
              onFormClose={handleFormClose}
              onStatusChange={handleAddFormStatusChange}
            />
          )}

    </>
  )
}

export default AdminPortal
