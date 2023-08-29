import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import {  Link } from "react-router-dom";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const WorkExperienceTable = ({onEditWorkExperience,data,back,onAddWorkExperience}) => {
    const [values,setValues]= useState({
        workExperienceData: [],
        loading: true,
        columnDefs: [
       
          {
            headerName: "Company Name",
            field: "CompanyName",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Designation",
            field: "Designation",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "FromDate",
            field: "FromDate",
            sortable: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter",
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "ToDate",
            field: "ToDate",
            sortable: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter",
            // width: 150,
            // filter: true ,
          },
          
    
          {
            headerName: "",
            field: "edit",
            filter: false,
            width: 30,
            cellRendererFramework: renderEditButton
          },
          {
            headerName: "",
            field: "delete",
            filter: false,
            width: 30,
            cellRendererFramework: renderButton
          }
        ],
        rowData: [],
        
        defaultColDef: {
          resizable: true,
          width: 295,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function(params) {
          return 35;
        }
    })
   let workExperienceObj = [];
   let rowDataT = [];
  
  
   const loadWorkExperienceData = () => {
      axios
        .get(
          "http://localhost:5000/api/get-work-experience/" + data["_id"], {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
        )
        .then(response => {
          workExperienceObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            workExperienceData: response.data,
            loading: false
          }))
          rowDataT = [];
          // let data=this.educationObj.education["0"];
         workExperienceObj.workExperience.map(data => {
            let temp = {
              data,
              CompanyName:data["CompanyName"],
              Designation:data["Designation"],
              FromDate:data["FromDate"].slice(0, 10),
              ToDate:data["ToDate"].slice(0, 10),
              
            };
  
            rowDataT.push(temp);
          });
          setValues((prevState)=>({
            ...prevState,
            rowData: rowDataT
          }))
        })
        .catch(error => {
          console.log(error);
        });
    };
  
   const onWorkExperienceDelete = (e1, e2) => {
      console.log(e1, e2);
      if (window.confirm("Are you sure to delete this record? ") == true) {
        axios
          .delete("http://localhost:5000/api/delete-work-experience/" + e1 + "/" + e2, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadWorkExperienceData()
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
 
    useEffect(()=>{
        loadWorkExperienceData()
    })
  const  renderButton=(params)=>{
      console.log(params);
      if(this.props.back){return <React.Fragment/>}
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onWorkExperienceDelete(data["_id"],params.data.data["_id"])
          }
        />
      );
    }
  const renderEditButton=(params)=> {
      console.log(params);
      if(this.props.back){return <React.Fragment/>}
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEditWorkExperience(params.data.data)}
        />
      );
    }
  
  
  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Employee Work Experience Details {back?"of " +data["FirstName"]+" "+data["LastName"]:""}</h2>

    {back?(<Link to="/hr/employee">
     <Button
      variant="primary"
      id="add-button"
    >
      Back
    </Button>
    </Link>):<Button
      variant="primary"
      id="add-button"
      onClick={onAddWorkExperience}
    >
      <FontAwesomeIcon icon={faPlus} id="plus-icon" />
      Add
    </Button>}

    

    <div id="clear-both" />

{!values.loading ? (
<div
id="table-div"
className="ag-theme-balham"
//   style={
//     {
//     height: "500px",
//     width: "100%"
//   }
// }
>
<AgGridReact
  columnDefs={values.columnDefs}
  defaultColDef={values.defaultColDef}
  columnTypes={values.columnTypes}
  rowData={values.rowData}
  // floatingFilter={true}
  // onGridReady={this.onGridReady}
  pagination={true}
  paginationPageSize={10}
  getRowHeight={values.getRowHeight}
/>
</div>
) : (
<div id="loading-bar">
<RingLoader
  css={override}
  sizeUnit={"px"}
  size={50}
  color={"#0000ff"}
  loading={true}
/>
</div>
)}


</div>
  )
}


export default WorkExperienceTable
