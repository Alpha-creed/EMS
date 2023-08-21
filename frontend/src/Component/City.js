import React, { useState } from 'react'
import CityFormEdit from './CityFormEdit'
import CityTable from './CityTable'
import CityForm from './CityForm'

const City = () => {
    const [table,setTable] = useState(true)
    const [editForm,setEditForm] = useState(false)
    const [editData,setEditData] = useState({})

    const handleCitySubmit = event => {
      event.preventDefault();
      console.log("id", event.target[0].value, event.target[1].value);
      setTable(true)
  
      let body = {
        StateID: event.target[1].value,
        CityName: event.target[2].value
      };
      axios
        .post("http://localhost:5000/api/add-city", body, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
           setTable(false);
          setTable(true)
        })
        .catch(err => {
          console.log(err);
        });
  
    };

   const handleAddCity = () => {
      console.log("clicked1");
      setTable(false);
    };
   const handleEditCity = e => {
      console.log(e);
      console.log("clicked6");
      setEditForm(true)
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
    const handleCityEditUpdate = (info, newInfo) => {
      newInfo.preventDefault();
      setTable(true)
  
      let body = {
        StateID: newInfo.target[1].value,
        CityName: newInfo.target[2].value
      };
  
      axios
        .put("http://localhost:5000/api/update-city/" + info["_id"], body, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
          setEditForm(false)
          setTable(true)
        })
        .catch(err => {
          console.log(err);
        });
    };
  
  
  return (
    <>
      {table?(
        editForm?(
            <CityFormEdit
              onCityEditUpdate={handleCityEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={editData}
              />
        ):(
           <CityTable
          onAddCity={handleAddCity}
          onEditCity={handleEditCity}
           />
        )
        ):(
          <CityForm
              onCitySubmit={handleCitySubmit}
              onFormClose={handleFormClose}
            />
        )}
    </>
  )
}

export default City
