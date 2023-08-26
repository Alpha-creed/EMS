import React, { useState } from 'react'
import axios from "axios";
import SalaryTable from "./SalaryTable";
import SalaryForm from "./SalaryForm";
import SalaryFormEdit from "./SalaryFormEdit";


const Salary = () => {
    const [table,setTable] = useState(true)
    const [editForm,setEditForm] = useState(false)
    const [editData,setEitData] = useState({})
    handleSalarySubmit = event => {
        event.preventDefault();
        if(!(event.target[3].value==event.target[4].value)){
              window.alert("The bank account number you entered does not match ")
        }
        else{

          console.log("id", event.target[0].value, event.target[1].value);
          this.setState({ table: true });
      
          let body = {     
            // Status:this.state.editFormStatus,
            
        
        // DateOfJoining: { type: Date, required: true },
        // TerminateDate: { type: Date },
      
      
            // SalaryName: event.target[0].value,
            // Address: event.target[1].value,
            // CityID:event.target[4].value,
            // PostalCode: event.target[5].value,
            // Website: event.target[6].value,
            // Email: event.target[7].value,
            // ContactPerson: event.target[8].value,
            // ContactNo: event.target[9].value,
            // FaxNo: event.target[10].value,
            // PanNo: event.target[11].value,
            // GSTNo: event.target[12].value,
            // CINNo: event.target[13].value,  
           
            BasicSalary:  event.target[1].value,
            BankName:event.target[2].value,
            AccountNo: event.target[3].value,
            AccountHolderName:event.target[5].value,
            IFSCcode: event.target[6].value,
            TaxDeduction: event.target[7].value,
          };
          axios
            .post("http://localhost:5000/api/add-salary/"+event.target[0].value, body, {
              headers: {
                authorization: localStorage.getItem("token") || ""
              }
            })
            .then(res => {
              setTable(false)
              setTable(true)
            })
            .catch(err => {
              console.log(err);
          console.log(err.response);
          if(err.response.status==403){
            window.alert(err.response.data) ;}
            });
        }
  };
  handleAddSalary = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditSalary = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    setEditData(e)
  };
 const handleFormClose = () => {
    console.log("clicked1");
    setTable(true)
};
 const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false)
};

  const handleSalaryEditUpdate = (info, newInfo) => {
console.log("eeeeeeeeeeeeeeeeeeeeddddddddddddddddddddddddd")
    newInfo.preventDefault();
    if(!(newInfo.target[3].value==newInfo.target[4].value)){
      window.alert("The bank account number you entered does not match ")
}
else{
    let body = {     
      // Status:this.state.editFormStatus,
      
  
  // DateOfJoining: { type: Date, required: true },
  // TerminateDate: { type: Date },


      // SalaryName: event.target[0].value,
      // Address: event.target[1].value,
      // CityID:event.target[4].value,
      // PostalCode: event.target[5].value,
      // Website: event.target[6].value,
      // Email: event.target[7].value,
      // ContactPerson: event.target[8].value,
      // ContactNo: event.target[9].value,
      // FaxNo: event.target[10].value,
      // PanNo: event.target[11].value,
      // GSTNo: event.target[12].value,
      // CINNo: event.target[13].value,  
      BasicSalary:  newInfo.target[1].value,
      BankName:newInfo.target[2].value,
      AccountNo: newInfo.target[3].value,
      AccountHolderName:newInfo.target[5].value,
      IFSCcode: newInfo.target[6].value,
      TaxDeduction: newInfo.target[7].value,      
    };
    console.log("update", body);
    axios
      .put(
        "http://localhost:5000/api/update-salary/" + info["salary"][0]["_id"],
        body, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then(res => {
        setTable(false)
        setTable(true)
      })
      .catch(err => {
        console.log(err);
      });

    setEditForm(false)
  }
  };

  return (
    <>
      {table ? (
          editForm ? (
            <SalaryFormEdit
              onSalaryEditUpdate={handleSalaryEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={editData}
              onGenderChange={handleEditFormGenderChange}
            />
          ) : (
            <SalaryTable
              onAddSalary={handleAddSalary}
              onEditSalary={handleEditSalary}              
            />
          )
        ) : (
          <SalaryForm
            onSalarySubmit={handleSalarySubmit}
            onFormClose={handleFormClose}
            onGenderChange={handleAddFormGenderChange}
          />
        )}
    </>
  )
}

export default Salary
