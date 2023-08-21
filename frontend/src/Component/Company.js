import React, { useState } from 'react'
import CompanyFormEdit from './CompanyFormEdit'

const Company = () => {
    const [table,setTable] = useState(true)
    const [editForm,setEditForm] = useState(false)
    const [editData,setEditData] = useState({})

  const handleCompanySubmit = event => {
        event.preventDefault();
        console.log("id", event.target[0].value, event.target[1].value);
        setTable(true)
    
        let body = {
          CompanyName: event.target[0].value,
          Address: event.target[1].value,
          CityID: event.target[4].value,
          PostalCode: event.target[5].value,
          Website: event.target[6].value,
          Email: event.target[7].value,
          ContactPerson: event.target[8].value,
          ContactNo: event.target[9].value,
          FaxNo: event.target[10].value,
          PanNo: event.target[11].value,
          GSTNo: event.target[12].value,
          CINNo: event.target[13].value,
        };
        axios
          .post("http://localhost:5000/api/add-company", body, {
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
          });
      };
     const handleAddCompany = () => {
        console.log("clicked1");
        setTable(false)
      };
     const handleEditCompany = e => {
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
    const handleCompanyEditUpdate = (info, newInfo) => {
        newInfo.preventDefault();
        let body = {
          CompanyName: newInfo.target[0].value,
          Address: newInfo.target[1].value,
          CityID: newInfo.target[4].value,
          PostalCode: newInfo.target[5].value,
          Website: newInfo.target[6].value,
          Email: newInfo.target[7].value,
          ContactPerson: newInfo.target[8].value,
          ContactNo: newInfo.target[9].value,
          FaxNo: newInfo.target[10].value,
          PanNo: newInfo.target[11].value,
          GSTNo: newInfo.target[12].value,
          CINNo: newInfo.target[13].value,
        };
        console.log("update", body);
        axios
          .put(
            "http://localhost:5000/api/update-company/" + info["_id"],
            body, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
          )
          .then(res => {
            // this.componentDidMount();
            setTable(false)
            setTable(true)
          })
          .catch(err => {
            console.log(err);
          });
    
          setEdit(false)
      };

  return (
    <>
      {
        table?(
            editForm?(
            <CompanyFormEdit
              onCompanyEditUpdate={handleCompanyEditUpdate}
              onFormEditClose={handleEditFormClose}
              editData={setEditData}
            />
          ) : (
              <CompanyTable
                onAddCompany={handleAddCompany}
                onEditCompany={handleEditCompany}
              />
            )
        ) : (
            <CompanyForm
              onCompanySubmit={handleCompanySubmit}
              onFormClose={handleFormClose}
            />
        )
      }
    </>
  )
}

export default Company
