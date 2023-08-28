import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const EducationTable = ({data,back,onEditEducation}) => {
    const [values,setValues] = useState({
        educationData: [],
        loading: true,
    
        columnDefs: [
    
          {
            headerName: "School/University",
            field: "SchoolUniversity",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Degree",
            field: "Degree",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Grade",
            field: "Grade",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Passing Of Year",
            field: "PassingOfYear",
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
        getRowHeight: function (params) {
          return 35;
        }
    
    })

   let educationObj = [];
   let rowDataT = [];
  
  
   const loadEducationData = () => {
      axios
        .get("http://localhost:5000/api/get-education/" + data["_id"], {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          educationObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            educationData: response.data,
            loading: false,
        }))
          rowDataT = [];
          // let data=this.educationObj.education["0"];
          educationObj.education.map(data => {
            let temp = {
              data,
              SchoolUniversity: data["SchoolUniversity"],
              Degree: data["Degree"],
              Grade: data["Grade"],
              PassingOfYear: data["PassingOfYear"],
  
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
  
   const onEducationDelete = (e1, e2) => {
      console.log(e1, e2);
      if (window.confirm("Are you sure to delete this record? ") == true) {
        axios
          .delete("http://localhost:5000/api/delete-education/" + e1 + "/" + e2, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadEducationData()
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    useEffect(()=>{
        loadEducationData()
    })
    
   const renderButton=(params)=> {
      console.log(params);
      if (back) { return <React.Fragment /> }
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onEducationDelete(data["_id"], params.data.data["_id"])
          }
        />
      );
    }
  const  renderEditButton=(params)=> {
      console.log(params);
      if (back) { return <React.Fragment /> }
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEditEducation(params.data.data)}
        />
      );
    }
  
   
  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Employee Education Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}</h2>

    {this.props.back ? (<Link to="/hr/employee">
      <Button
        variant="primary"
        id="add-button"
      >
        Back
    </Button>
    </Link>) : <Button
      variant="primary"
      id="add-button"
      onClick={this.props.onAddEducation}
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

export default EducationTable
