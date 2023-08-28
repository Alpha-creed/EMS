import React, { useEffect, useState } from 'react'
import React, { Component } from "react";
import "./StateTable.css";
import axios from "axios";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import {Button} from "react-bootstrap";

// var FontAwesome = require('react-fontawesome');
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const StateTable = (props) => {
    const {onEditState,onAddState} = props
    const [values,setValues] = useState({
        stateData: [],
        loading: true,
    
        columnDefs: [
       
          {
            headerName: "Country",
            field: "CountryName",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
       
          {
            headerName: "State",
            field: "StateName",
            sortable: true,
            // width: 150,
            // filter: true ,
          },
          
          
    
          {
            headerName: "",
            field: "edit",
            filter: false,
            width: 30,
            cellRendererFramework: renderEditButton          },
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
        getRowHeight: function(params) {
          return 35;
        }
    
    })

  let stateObj = [];
  let rowDataT = [];

  // stateDataArray;
  const loadStateData = () => {
    axios
      .get("http://localhost:5000/api/get-state", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        // if(response.data.length==0){this.stateObj=["temp"];}
        // else{
        stateObj = response.data;
        // }
        console.log("response", response.data);
        setValues((prevState)=>({
            ...prevState,
            stateData: response.data,
            loading: false,
        }))
        rowDataT = [];

        stateObj.map(data => {
          let temp = {
            data,
            CountryName: data["country"][0]["CountryName"],
            StateName:data["StateName"],
            
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

 const onStateDelete = e => {
    console.log(e);
    // let body= "ID=" + e;
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete("http://localhost:5000/api/delete-state/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          loadStateData()
        })
        .catch(err => {
          console.log(err);
          console.log(err.response);
          if(err.response.status==403){
            window.alert(err.response.data) ;}
        });
    }

    // axios
    // .delete("http://localhost:4000/api/state", })
    // .then(response => {

    // })
    // .catch(error => {
    //   console.log(error);
    // });
    // axios.delete('http://localhost:4000/api/state')
    //      .then(res => console.log(res.data));
    // fetch("http://localhost:4000/api/state", {
    //   method: 'delete'
    // })
    // .then(response => response.json());
  };

  // function print(){{console.log("test")}}
  //   print();

      useEffect(()=>{
        loadStateData()
      })
  const renderButton=(params)=> {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onStateDelete(params.data.data["_id"])
        }
      />
    );
  }
 const renderEditButton=(params)=> {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => onEditState(params.data.data)}
      />
    );
  }

  return (
    <div>
          <div id="table-outer-div-scroll">
        <h2 id="role-title">State Details</h2>
        {/* <Link to="/admin/role/form"> */}
        {/* <button id="add-button" >
          
          Add
        </button> */}
        <Button variant="primary" id="add-button" onClick={onAddState}><FontAwesomeIcon icon={faPlus} id="plus-icon" />Add</Button>
        {/* </Link> */}
        <div id="clear-both"></div>
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

export default StateTable
