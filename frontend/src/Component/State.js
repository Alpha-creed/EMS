import React, { useState } from 'react'
import axios from "axios";
import StateTable from "./StateTable";
import StateForm from "./StateForm";
import StateFormEdit from "./StateFormEdit";

const State = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {}
    })
   const handleStateSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        this.setState({ table: true });
        setValues((prevState)=>({
                ...prevState,
                table: true
              }))
    
        let body = {
          CountryID: event.target[0].value,
          StateName: event.target[1].value
        };
        //  let body= "CompanyID=" + event.target[0].value + "&State=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/add-state", body, {
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
     const handleAddState = () => {
        console.log("clicked1");
        setValues((prevState)=>({
                ...prevState,
                table: false,
              }))
      };
    const handleEditState = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
                ...prevState,
                editForm: true,
                editData: e
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
     const handleStateEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        // this.setState({ table: true });
        let body = {
          CountryID: newInfo.target[0].value,
          StateName: newInfo.target[1].value
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/update-state/" + info["_id"], body, {
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
            <StateFormEdit
              onStateEditUpdate={handleStateEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
            <StateTable
              onAddState={handleAddState}
              onEditState={handleEditState}
            />
          )
        ) : (
          <StateForm
            onStateSubmit={handleStateSubmit}
            onFormClose={handleFormClose}
          />
        )}

        {/* <div>debru</div> */}
        {/* <Route path="/admin/state/table" exact component={StateTable} /> */}
        {/* <Route path="/admin/state/form" exact component={() => <StateForm onStateSubmit={this.handleStateSubmit} />} /> */}

        {/* <StateTable/> */}
      
    </>
  )
}

export default State
