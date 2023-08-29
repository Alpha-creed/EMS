import React, { useState } from 'react'
import axios from "axios";
import AdminProjectBidTable from "./AdminProjectBidTable";
import AdminProjectBidForm from "./AdminProjectBidForm";
import AdminProjectBidFormEdit from "./AdminProjectBidFormEdit";

const AdminProjectBid = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {}
    })
   const handleProjectBidSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
           setValues((prevState)=>({
            ...prevState,
            table: true           
         }))
    
        let body = {
          ProjectTitle: event.target[0].value,
          ProjectURL: event.target[1].value,
          ProjectDesc:event.target[2].value,
          Portal_ID:event.target[3].value,
          EstimatedTime:event.target[4].value,
          EstimatedCost:event.target[5].value,
          ResourceID:event.target[6].value,
          Status:event.target[7].value,
          Remark:event.target[8].value,
    
        
        
        };
        //  let body= "CompanyID=" + event.target[0].value + "&ProjectBid=" + event.target[1].value;
        //  let body= "";
        axios
          .post("http://localhost:5000/api/admin/add-project-bid", body, {
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
    const  handleAddProjectBid = () => {
        console.log("clicked1");
           setValues((prevState)=>({
            ...prevState,
            table: false           
         }))
      };
     const handleEditProjectBid = e => {
        console.log(e);
        console.log("clicked6");
           setValues((prevState)=>({
            ...prevState,
            editForm: true,
            editData: e           
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
    
     const handleProjectBidEditUpdate = (info,editInfo) => {
        // this.setState({ table: true });
        let body = {
          // ...info,CompanyID:formData1,ProjectBid:formData2
          // _id: info["_id"],
          ProjectTitle: editInfo.target[0].value,
          ProjectURL: editInfo.target[1].value,
          ProjectDesc:editInfo.target[2].value,
          Portal_ID:editInfo.target[3].value,
          EstimatedTime:editInfo.target[4].value,
          EstimatedCost:editInfo.target[5].value,
          ResourceID:editInfo.target[6].value,
          Status:editInfo.target[7].value,
          Remark:editInfo.target[8].value,
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/admin/update-project-bid/" + info["_id"], body, {
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
            <AdminProjectBidFormEdit
              onProjectBidEditUpdate={handleProjectBidEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
            <AdminProjectBidTable
              onAddProjectBid={handleAddProjectBid}
              onEditProjectBid={handleEditProjectBid}
            />
          )
        ) : (
          <AdminProjectBidForm
            onProjectBidSubmit={handleProjectBidSubmit}
            onFormClose={handleFormClose}
          />
        )}

    </>
  )
}

export default AdminProjectBid
