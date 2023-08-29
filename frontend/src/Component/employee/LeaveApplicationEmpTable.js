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

const LeaveApplicationEmpTable = ({data,onAddLeaveApplicationEmp}) => {
    const [values,setValues]=useState({
        leaveApplicationEmpData: [],
        loading: true,
    
        columnDefs: [
    
          {
            headerName: "Leave type",
            field: "Leavetype",
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
            headerName: "Reasonforleave",
            field: "Reasonforleave",
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
          width: 235,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
    
    })
   let leaveApplicationEmpObj = [];
   let rowDataT = [];
  
  
   const loadLeaveApplicationEmpData = () => {
      axios
        .get(
          "http://localhost:5000/api/add-leave-application-emp/" +
          this.props.data["_id"], {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
        )
        .then(response => {
          leaveApplicationEmpObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            leaveApplicationEmpData: response.data,
            loading: false
        }))
          rowDataT = [];
          // let data=this.educationObj.education["0"];
          leaveApplicationEmpObj.leaveApplication.map(data => {
            let temp = {
              data,
              Leavetype: data["Leavetype"],
              FromDate: data["FromDate"].slice(0, 10),
              ToDate: data["ToDate"].slice(0, 10),
              Reasonforleave: data["Reasonforleave"],
              Status: status(data["Status"]),
  
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
  
   const onLeaveApplicationEmpDelete = (e1, e2) => {
      console.log(e1, e2);
      if (window.confirm("Are you sure to delete this record? ") == true) {
        axios
          .delete(
            "http://localhost:5000/api/delete-leave-application-emp/" + e1 + "/" + e2, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
          )
          .then(res => {
            loadLeaveApplicationEmpData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    useEffect(()=>{
        loadLeaveApplicationEmpData();
    })
  
   const renderButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onLeaveApplicationEmpDelete(data["_id"], params.data.data["_id"])
          }
        />
      );
    }
   const renderEditButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEdit(params.data.data)}
        />
      );
    }
  
   const status = s => {
      if (s == 1) {
        return "Pending";
      }
      if (s == 2) {
        return "Approved";
      }
      if (s == 3) {
        return "Rejected";
      }
    };
   const onEdit = data => {
      if (data["Status"] == 1) {
        this.props.onEditLeaveApplicationEmp(data);
      } else {
        window.alert(
          "You can not edit application after it approved or rejected"
        );
      }
    };
  
  return (
    <div id="table-outer-div-scroll">
        <h2 id="role-title">Leave Application</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={onAddLeaveApplicationEmp}
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

export default LeaveApplicationEmpTable
