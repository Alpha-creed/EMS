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
 
const CountryTable = (props) => {
    const {onEditCountry,onAddCountry} =props
    const [values,setValues] = useState({
        countryData: [],
        loading: true,
    
        columnDefs: [
          {
            headerName: "Country",
            field: "CountryName",
            sortable: true
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
          width: 1180,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
    })

    let countryObj=[];
    let rowDataT=[];

   const loadCountryData = () => {
        axios
          .get("http://localhost:5000/api/get-country", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            // if(response.data.length==0){this.countryObj=["temp"];}
            // else{
            countryObj = response.data;
            // }
            console.log("response", response.data);
            setValues(prevState=>({
                ...prevState,
                countryData: response.data,
                loading: false
            }))
            rowDataT = [];
    
            countryObj.map(data => {
              let temp = {
                data,
                CountryName: data["CountryName"]
              };
    
            rowDataT.push(temp);
            });
            setValues(prevState=>({
                ...prevState,
                rowData: rowDataT 
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
    
      const onCountryDelete = e => {
        console.log(e);
        // let body= "ID=" + e;
        if (window.confirm("Are you sure to delete this record ? ") == true) {
          axios
            .delete("http://localhost:5000/api/delete-country/" + e, {
              headers: {
                authorization: localStorage.getItem("token") || ""
              }
            })
            .then(res => {
              // console.log(res);
              loadCountryData();
            })
            .catch(err => {
              console.log(err.response);
              if (err.response.status == 403) {
                window.alert(err.response.data);
              }
            });
        }
      };
    
      useEffect(()=>{
        loadCountryData()
      })
    
     const renderButton=(params)=> {
        console.log(params);
        return (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => onCountryDelete(params.data.data["_id"])}
          />
        );
      }
      const renderEditButton=(params) =>{
        console.log(params);
        return (
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onEditCountry(params.data.data)}
          />
        );
      }

  return (
    <div>
        <div id="table-outer-div-scroll">
        <h2 id="role-title">Country Details</h2>
        {/* <Link to="/admin/role/form"> */}
        {/* <button id="add-button" >
          
          Add
        </button> */}
        <Button
          variant="primary"
          id="add-button"
          onClick={onAddCountry}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        {/* </Link> */}
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
    </div>
  )
}

export default CountryTable
