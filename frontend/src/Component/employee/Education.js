import React, { useState } from 'react'
import axios from "axios";
import EducationTable from "./EducationTable";
import EducationForm from "./EducationForm";
import EducationFormEdit from "./EducationFormEdit";

const Education = ({data,back}) => {
    const [values,setValues]= useState({
        table: true,
        editForm: false,
        editData: {},
    
    })

   const handleEducationSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))
    
        let body = {
    
          SchoolUniversity: event.target[0].value,
          Degree: event.target[1].value,
          Grade: event.target[2].value,
          PassingOfYear: event.target[3].value,
        };
        axios
          .post("http://localhost:5000/api/add-education/" + this.props.data["_id"], body, {
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
     const handleAddEducation = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false
        }))
      };
     const handleEditEducation = e => {
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
     const handleEducationEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
          SchoolUniversity: newInfo.target[0].value,
          Degree: newInfo.target[1].value,
          Grade: newInfo.target[2].value,
          PassingOfYear: newInfo.target[3].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-education/" + info["_id"],
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
            <EducationFormEdit
              onEducationEditUpdate={handleEducationEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <EducationTable
                onAddEducation={handleAddEducation}
                onEditEducation={handleEditEducation}
                data={data}
                back={back}
              />
            )
        ) : (
            <EducationForm
              onEducationSubmit={handleEducationSubmit}
              onFormClose={handleFormClose}
              onGenderChange={handleAddFormGenderChange}
            />
          )}
      
    </>
  )
}

export default Education
