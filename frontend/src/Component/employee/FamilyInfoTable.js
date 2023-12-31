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

const FamilyInfoTable = ({data,back,onEditFamilyInfo,onAddFamilyInfo}) => {
    const [values,setValues] = useState({
        familyInfoData: [],
        loading: true,
    
    
        columnDefs: [
    
          {
            headerName: "Name",
            field: "Name",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Relationship",
            field: "Relationship",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "DOB",
            field: "DOB",
            sortable: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter",
            // width: 150,
            // filter: true ,
          },
          {
            headerName: "Occupation",
            field: "Occupation",
            sortable: true,
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
   let familyInfoObj = [];
   let rowDataT = [];
  
  
   const loadFamilyInfoData = () => {
      axios
        .get("http://localhost:5000/api/get-family-info/" + data["_id"], {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          familyInfoObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            familyInfoData: response.data,
            loading: false
          }))
          rowDataT = [];
          // let data=this.familyInfoObj.familyInfo["0"];
           familyInfoObj.familyInfo.map(data => {
            let temp = {
              data,
              Name: data["Name"],
              Relationship: data["Relationship"],
              DOB: data["DOB"].slice(0, 10),
              Occupation: data["Occupation"],
  
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
  
   const onFamilyInfoDelete = (e1, e2) => {
      console.log(e1, e2);
      if (window.confirm("Are you sure to delete this record? ") == true) {
        axios
          .delete("http://localhost:5000/api/delete-family-info/" + e1 + "/" + e2, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadFamilyInfoData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    useEffect(()=>{
        loadFamilyInfoData()
    })
  
   const renderButton=(params)=> {
      console.log(params);
      if (back) { return <React.Fragment /> }
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onFamilyInfoDelete(data["_id"], params.data.data["_id"])}
        />
      );
    }
   const renderEditButton=(params)=> {
      console.log(params);
      if (back) { return <React.Fragment /> }
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEditFamilyInfo(params.data.data)}
        />
      );
    }
  
  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Employee Family Details {back ? "of " + data["FirstName"] + " " + data["LastName"] : ""}</h2>

    {back ? (<Link to="/hr/employee">
      <Button
        variant="primary"
        id="add-button"
      >
        Back
    </Button>
    </Link>) :
      <Button
        variant="primary"
        id="add-button"
        onClick={onAddFamilyInfo}
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

export default FamilyInfoTable;
