import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Form, Button, Col, Row } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const LeaveApplicationHRTable = ({onEditLeaveApplicationHR}) => {
    const [values,setValues] = useState({
        leaveApplicationHRData: [],
        loading: true,
        searchData: "",
    
        columnDefs: [
          {
            headerName: "Emloyee Code",
            field: "EmployeeCode",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Name",
            field: "Name",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Leave type",
            field: "Leavetype",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "From Date",
            field: "FromDate",
            sortable: true,
            filter: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter"
          },
          {
            headerName: "To Date",
            field: "ToDate",
            sortable: true,
            filter: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter"
          },
          {
            headerName: "Reasonforleave",
            field: "Reasonforleave",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Status",
            field: "Status",
            sortable: true
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
          width: 170,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
    })
   let leaveApplicationHRObj = [];
  let rowDataT = [];

 const loadLeaveApplicationHRData = () => {
    axios
      .get("http://localhost:5000/api/get-leave-application-hr/", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        leaveApplicationHRObj = response.data;
        console.log("response", response.data);
        setValues((prevState)=>({
            ...prevState,
            leaveApplicationHRData: response.data,
            loading: false
        }))
        rowDataT = [];

        this.leaveApplicationHRObj.map(data => {
          let temp = {
            data,
            EmployeeCode: data["employee"][0]["EmployeeCode"],
            Name:
              data["employee"][0]["FirstName"] +
              " " +
              data["employee"][0]["LastName"],
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            Status: this.status(data["Status"])
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

 const onLeaveApplicationHRDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(
          "http://localhost:5000/api/delete-leave-application-hr/" + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
        )
        .then(res => {
          loadLeaveApplicationHRData()
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
 
  useEffect(()=>{
    loadLeaveApplicationHRData()
  })
  const renderButton=(params)=> {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onLeaveApplicationHRDelete(
            params.data.data["employee"][0]["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
 const renderEditButton=(params) =>{
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => onEditLeaveApplicationHR(params.data.data)}
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

  return (
    <div>
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee Leave Application Details</h2>

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

        {/* <div id="inner-table-div">
          <table id="role-table">
            <thead>
              <tr>
                <th width="13%">Emloyee Code</th>
                <th width="13%">Name</th>
                <th width="13%">Leavetype</th>
                <th width="13%">FromDate</th>
                <th width="13%">ToDate</th>
                <th width="13%">Reasonforleave</th>
                <th width="13%">Status</th>
                <th width="4.5%" />
                <th width="4.5%" />
              </tr>
            </thead>

            {!this.state.loading ? (
              <tbody>
                {filteredLeaveA.map((data, index) => (
                  <tr key={index}>
                    <td>{data["employee"][0]["EmployeeCode"]}</td>
                    <td>
                      {data["employee"][0]["FirstName"] +
                        " " +
                        data["employee"][0]["LastName"]}
                    </td>
                    <td>{data["Leavetype"]}</td>
                    <td>{data["FromDate"].slice(0, 10)}</td>
                    <td>{data["ToDate"].slice(0, 10)}</td>
                    <td>{data["Reasonforleave"]}</td>
                    <td>{this.status(data["Status"])}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() =>
                          this.props.onEditLeaveApplicationHR(data)
                        }
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          this.onLeaveApplicationHRDelete(
                            data["employee"][0]["_id"],
                            data["_id"]
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td>
                    <div id="loading-bar">
                      <BarLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={"#0000ff"}
                        loading={true}
                      />
                    </div>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
            )}
          </table>
        </div> */}
      </div>

    </div>
  )
}

export default LeaveApplicationHRTable
