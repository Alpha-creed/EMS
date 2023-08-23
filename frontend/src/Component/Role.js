import React, { useState } from 'react'

const Role = () => {
    const [values,setValues] = useState({
        table: true,
    editForm: false,
    editData: {}
    })

   const handleRoleSubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))    

        let body = {
          CompanyID: event.target[0].value,
          RoleName: event.target[1].value
        };
        //  let body= "CompanyID=" + event.target[0].value + "&Role=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/add-role", body, {
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
     const handleAddRole = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false,
        })) 
      };
     const handleEditRole = e => {
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
  
     const handleRoleEditUpdate = (info, formData1, formData2) => {
        // this.setState({ table: true });
        let body = {
          // ...info,CompanyID:formData1,Role:formData2
    
          CompanyID: formData1,
          RoleName: formData2,
    
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/update-role/" + info["_id"], body, {
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
            <RoleFormEdit
              onRoleEditUpdate={handleRoleEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <RoleTable
                onAddRole={handleAddRole}
                onEditRole={handleEditRole}
              />
            )
        ) : (
            <RoleForm
              onRoleSubmit={handleRoleSubmit}
              onFormClose={handleFormClose}
            />
          )}

        {/* <div>debru</div> */}
        {/* <Route path="/admin/role/table" exact component={RoleTable} /> */}
        {/* <Route path="/admin/role/form" exact component={() => <RoleForm onRoleSubmit={this.handleRoleSubmit} />} /> */}

        {/* <RoleTable/> */}
      
    </>
  )
}

export default Role
