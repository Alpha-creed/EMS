import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";


import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminPortalTable = ({onEditPortal,onAddPortal}) => {
    const [values,setValues] = useState({
        portalData: [],
        loading: true,
    
        columnDefs: [
    
          {
            headerName: "Portal",
            field: "PortalName",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
    
          {
            headerName: "Status",
            field: "Status",
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
          width: 590,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
      
    })
   let portalObj = [];
   let rowDataT = [];
  
   const loadPortalData = () => {
      axios
        .get("http://localhost:5000/api/admin/get-portal", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          portalObj = response.data;
          // }
          console.log("response", response.data);
             setValues((prevState)=>({
                ...prevState,
                portalData: response.data,
                loading: false 
              }))
          rowDataT = [];
  
          portalObj.map(data => {
            let temp = {
              data,
              PortalName: data["PortalName"],
              Status: data["Status"] == 1 ? "enable" : "disable",
  
            };
  
            rowDataT.push(temp);
          });
             setValues((prevState)=>({
                ...prevState,
                rowData: this.rowDataT              }))
        })
        .catch(error => {
          console.log(error);
        });
    };
  
   const onPortalDelete = e => {
      console.log(e);
      if (
        window.confirm(
          "Are you sure to delete this record,It Will Delete All Projects Related to This Portal? "
        ) == true
      ) {
        axios
          .delete("http://localhost:5000/api/admin/delete-portal/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadPortalData()
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    useEffect(()=>{
        loadPortalData();
    })

   const renderButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onPortalDelete(params.data.data["_id"])
          }
        />
      );
    }
   const renderEditButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEditPortal(params.data.data)}
        />
      );
    }
  
   
  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Portal Details</h2>
    <Button
      variant="primary"
      id="add-button"
      onClick={onAddPortal}
    >
      <FontAwesomeIcon icon={faPlus} id="plus-icon" />
      Add
    </Button>
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

export default AdminPortalTable
