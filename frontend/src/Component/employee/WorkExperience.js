import React, { useState } from 'react'
import WorkExperienceFormEdit from './WorkExperienceFormEdit';
import WorkExperienceForm from './WorkExperienceForm';
import WorkExperienceTable from './WorkExperienceTable';

const WorkExperience = ({data,back}) => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {},
    })
   const handleWorkExperienceSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true 
        }))
    
        let body = {
    
          CompanyName: event.target[0].value,
          Designation: event.target[1].value,
          FromDate: event.target[2].value,
          ToDate: event.target[3].value,
        };
        axios
          .post("http://localhost:5000/api/add-work-experience/" + this.props.data["_id"], body, {
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
    const  handleAddWorkExperience = () => {
        console.log("clicked1");
        this.setState({ table: false });
        setValues((prevState)=>({
            ...prevState,
            table: false
        }))
      };
    const  handleEditWorkExperience = e => {
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
        this.setState({ table: true });
        setValues((prevState)=>({
            ...prevState,
            table: true 
        }))
      };
    const  handleEditFormClose = () => {
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
     const handleWorkExperienceEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
          CompanyName: newInfo.target[0].value,
          Designation: newInfo.target[1].value,
          FromDate: newInfo.target[2].value,
          ToDate: newInfo.target[3].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-work-experience/" + info["_id"],
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
            <WorkExperienceFormEdit
              onWorkExperienceEditUpdate={handleWorkExperienceEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}

            />
          ) : (
              <WorkExperienceTable
                onAddWorkExperience={handleAddWorkExperience}
                onEditWorkExperience={handleEditWorkExperience}
                data={data}
                back={back}
              />
            )
        ) : (
            <WorkExperienceForm
              onWorkExperienceSubmit={handleWorkExperienceSubmit}
              onFormClose={handleFormClose}
              onGenderChange={handleAddFormGenderChange}
            />
          )}
      
    </>
  )
}

export default WorkExperience
