import React, { useState } from 'react'
import axios from "axios";
import FamilyInfoTable from "./FamilyInfoTable";
import FamilyInfoForm from "./FamilyInfoForm";
import FamilyInfoFormEdit from "./FamilyInfoFormEdit";

const FamilyInfo = ({data,back}) => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {},
    })

   const handleFamilyInfoSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))
    
        let body = {
          Name: event.target[0].value,
          Relationship: event.target[1].value,
          DOB: event.target[2].value,
          Occupation: event.target[3].value,
        };
        axios
          .post("http://localhost:5000/api/add-family-info/" + this.props.data["_id"], body, {
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
    const  handleAddFamilyInfo = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false
        }))
      };
    const  handleEditFamilyInfo = e => {
        console.log(e);
        console.log("clicked6");
         setValues((prevState)=>({
            ...prevState,
            editForm: true,
            editData: e,
            editFormGender: e["Gender"] 

        }))
      };
    const  handleFormClose = () => {
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
     const handleFamilyInfoEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
          Name: newInfo.target[0].value,
          Relationship: newInfo.target[1].value,
          DOB: newInfo.target[2].value,
          Occupation: newInfo.target[3].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-family-info/" + info["_id"],
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
      {values.table ? (
          values.editForm ? (
            <FamilyInfoFormEdit
              onFamilyInfoEditUpdate={handleFamilyInfoEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <FamilyInfoTable
                onAddFamilyInfo={handleAddFamilyInfo}
                onEditFamilyInfo={handleEditFamilyInfo}
                data={data}
                back={back}
              />
            )
        ) : (
            <FamilyInfoForm
              onFamilyInfoSubmit={handleFamilyInfoSubmit}
              onFormClose={handleFormClose}
              onGenderChange={handleAddFormGenderChange}
            />
          )}
    </>
  )
}

export default FamilyInfo
