import React, { useState } from 'react'
import PersonalInfoFormEdit from './PersonalInfoFormEdit';
import PersonalInfoTable from './PersonalInfoTable';

const PersonalInfo = ({data,back}) => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {},
        addFormGender: "",
        editFormGender: ""
    })
   const handleEditPersonalInfo = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
            ...prevState,
            editForm: true, 
            editData: e,
            editFormGender: e["Gender"]
        }))
      };
    const  handleEditFormClose = () => {
        console.log("clicked5");
        setValues((prevState)=>({
            ...prevState,
            editForm: false   
        }))
      };
     const handlePersonalInfoEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        console.log("zero data", newInfo.target[0].value);
        let body = {
          Gender: this.state.editFormGender,
          ContactNo: newInfo.target[5].value,
          EmergencyContactNo: newInfo.target[6].value,
          Email: newInfo.target[7].value,
          PANcardNo: newInfo.target[8].value,
          DOB: newInfo.target[9].value,
          BloodGroup: newInfo.target[10].value,
          Hobbies: newInfo.target[11].value,
          PresentAddress: newInfo.target[12].value,
          PermanetAddress: newInfo.target[13].value
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/update-personal-info/" + info["_id"], body, {
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
    
        setValues((prevState)=>({
            ...prevState,
            editForm: false 
        }))
      };
     const handleEditFormGenderChange = e => {
        // console.log(e.currentTarget.value);
        // console.log("ggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnn")
        setValues((prevState)=>({
            ...prevState,
            editFormGender: e.currentTarget.value
        }))
      };
    
  return (
    <>
        {values.table ? (
          values.editForm ? (
            <PersonalInfoFormEdit
              onPersonalInfoEditUpdate={handlePersonalInfoEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
              onGenderChange={handleEditFormGenderChange}
            />
          ) : (
              <PersonalInfoTable
                onAddPersonalInfo={handleAddPersonalInfo}
                onEditPersonalInfo={handleEditPersonalInfo}
                data={data}
                back={back}
              />
            )
        ) : (
            <div />
          )}
    </>
  )
}

export default PersonalInfo
