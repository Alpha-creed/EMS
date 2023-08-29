import React, { useState } from 'react'

const Country = () => {
    const [values,setValues]=useState({
        table: true,
        editForm: false,
        editData: {}
    })

    const handleCountrySubmit = event => {
        event.preventDefault();
        console.log("name", event.target[0].value);
        setValues((prevState)=>({
            ...prevState,
            table: true
        }))

        let body = {
          CountryName: event.target[0].value
        };
        //  let body= "CompanyID=" + event.target[0].value + "&Country=" + event.target[1].value;
        //  let body= "debru";
        axios
          .post("http://localhost:5000/api/add-country", body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            setValues((prevState)=>({
                ...prevState,
                table: false
            }))
            setValues((prevState)=>({
                ...prevState,
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
      const handleAddCountry = () => {
        console.log("clicked1");
        setValues((prevState)=>({
            ...prevState,
            table: false
        }))
      };
     const handleEditCountry = e => {
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
     const handleCountryEditUpdate = (info, newInfo) => {
        // this.setState({ table: true });
        let body = {
          // ...info,CompanyID:formData1,Country:formData2
          //   CompanyID: formData1,
          CountryName: newInfo.target[0].value,
          //   CountryID: info["CountryID"]
        };
        console.log("update", body);
        axios
          .put("http://localhost:5000/api/update-country/" + info["_id"], body, {
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
            <CountryFormEdit
              onCountryEditUpdate={handleCountryEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={values.editData}
            />
          ) : (
              <CountryTable
                onAddCountry={handleAddCountry}
                onEditCountry={handleEditCountry}
              />
            )
        ) : (
            <CountryForm
              onCountrySubmit={handleCountrySubmit}
              onFormClose={handleFormClose}
            />
          )}

        {/* <div>debru</div> */}
        {/* <Route path="/admin/country/table" exact component={CountryTable} /> */}
        {/* <Route path="/admin/country/form" exact component={() => <CountryForm onCountrySubmit={this.handleCountrySubmit} />} /> */}

        {/* <CountryTable/> */}
    </>
  )
}

export default Country
