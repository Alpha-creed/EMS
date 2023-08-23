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

const PositionTable = (props) => {
    const{onEditPosition,onAddPosition} = props
    const [values,setValues] = useState({
        positionData: [],
        loading: true,
    
        columnDefs: [
    
          {
            headerName: "Company",
            field: "CompanyName",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
    
          {
            headerName: "Position",
            field: "PositionName",
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

   let positionObj = [];
    let rowDataT = [];
  
   const loadPositionData = () => {
      axios
        .get("http://localhost:5000/api/get-position", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          positionObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            positionData: response.data,
            loading: false,
          }))
          rowDataT = [];
  
          positionObj.map(data => {
            let temp = {
              data,
              CompanyName: data["company"][0]["CompanyName"],
              PositionName: data["PositionName"],
  
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
  
    const onPositionDelete = e => {
      console.log(e);
      if (window.confirm("Are you sure to delete this record ? ") == true) {
        axios
          .delete("http://localhost:5000/api/delete-position/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadPositionData();
          })
          .catch(err => {
            console.log(err);
            console.log(err.response);
            if (err.response.status == 403) {
              window.alert(err.response.data);
            }
  
          });
      }
    };
    useEffect(()=>{
        loadPositionData()
    })
   const renderButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            onPositionDelete(params.data.data["_id"])
          }
        />
      );
    }
   const renderEditButton=(params)=> {
      console.log(params);
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => onEditPosition(params.data.data)}
        />
      );
    }
  
  return (
    <div>
       <div id="table-outer-div-scroll">
        <h2 id="role-title">Position Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={onAddPosition}
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
        {/* <div id="inner-table-div">
          <table id="role-table">
            <thead>
            <tr>
                <th width="30%">Company</th>
                <th width="30%">Position</th>
                <th width="20%" />
                <th width="20%" />
              </tr>
            </thead>

            {!this.state.loading ? (
              <tbody>
                {this.positionObj.map((data, index) => (
                  <tr key={index}>
                    <td>{data["company"][0]["CompanyName"]}</td>
                    <td>{data["PositionName"]}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => this.props.onEditPosition(data)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.onPositionDelete(data["_id"])}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            )}
          </table>
        </div> */}
      </div>

    </div>
  )
}

export default PositionTable
