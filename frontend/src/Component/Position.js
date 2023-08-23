import React, { useState } from 'react'
import axios from "axios";
import PositionTable from "./PositionTable";
import PositionForm from "./PositionForm";
import PositionFormEdit from "./PositionFormEdit";

const Position = () => {
    const [values,setValues] = useState({
        table: true,
        editForm: false,
        editData: {}
    })

   const handlePositionSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))

        let body = {
          CompanyID: event.target[0].value,
          PositionName: event.target[1].value
        };
        //  let body= "CompanyID=" + event.target[0].value + "&Position=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/add-position", body, {
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
      const handleAddPosition = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false,
        }))
      };

     const handleEditPosition = e => {
        console.log(e);
        console.log("clicked6");
        setValues((prevState)=>({
            ...prevState,
            editForm: true,
            editData: e
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
     
      const handlePositionEditUpdate = (info, formData1, formData2) => {
        // this.setState({ table: true });
        let body = {
    
          CompanyID: formData1,
          PositionName: formData2,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-position/" + info["_id"],
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
            <PositionFormEdit
              onPositionEditUpdate={handlePositionEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <PositionTable
                onAddPosition={handleAddPosition}
                onEditPosition={handleEditPosition}
              />
            )
        ) : (
            <PositionForm
              onPositionSubmit={this.handlePositionSubmit}
              onFormClose={this.handleFormClose}
            />
          )}

        {/* <div>debru</div> */}
        {/* <Route path="/admin/Position/table" exact component={PositionTable} /> */}
        {/* <Route path="/admin/Position/form" exact component={() => <PositionForm onPositionSubmit={this.handlePositionSubmit} />} /> */}

        {/* <PositionTable/> */}
      
    </>
  )
}

export default Position
