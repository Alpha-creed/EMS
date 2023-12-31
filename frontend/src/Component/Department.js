import axios from 'axios';
import React, { useState } from 'react'
import DepartmentForm from './DepartmentForm'
import DepartmentFormEdit from './DepartmentFormEdit'
import DepartmentTable from "./DepartmentTable"


const Department = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {}
    })
   const handleDepartmentSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))
    
        let body = {
          CompanyID: event.target[0].value,
          DepartmentName: event.target[1].value
        };
        //  let body= "CompanyID=" + event.target[0].value + "&Department=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/add-department", body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            setValues((prevState)=>({
                ...prevState,
                table: false, 
                table: true,
            }))
   
          })
          .catch(err => {
            console.log(err);
          });
        // this.setState({ loading: true });
        // this.login(event.target[0].value, event.target[1].value);
        // event.target.reset();
      };
     const  handleAddDepartment = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false, 
        }))
      };
     const handleEditDepartment = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
            ...prevState,
            editForm: true, 
            editData: e,
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
    
      const handleDepartmentEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        // this.setState({ table: true });
        let body = {
          // ...info,CompanyID:formData1,Department:formData2
    
          CompanyID: newInfo.target[0].value,
          DepartmentName: newInfo.target[1].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-department/" + info["_id"],
            body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
          )
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
            <DepartmentFormEdit
              onDepartmentEditUpdate={handleDepartmentEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <DepartmentTable
                onAddDepartment={handleAddDepartment}
                onEditDepartment={handleEditDepartment}
              />
            )
        ) : (
            <DepartmentForm
              onDepartmentSubmit={handleDepartmentSubmit}
              onFormClose={handleFormClose}
            />
          )}

        {/* <div>debru</div> */}
        {/* <Route path="/admin/Department/table" exact component={DepartmentTable} /> */}
        {/* <Route path="/admin/Department/form" exact component={() => <DepartmentForm onDepartmentSubmit={this.handleDepartmentSubmit} />} /> */}

        {/* <DepartmentTable/> */}
    </>
  )
}

export default Department
