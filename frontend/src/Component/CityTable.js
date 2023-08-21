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
`

const CityTable = (cities) => {
    
    const [Datas,setDatas] = useState({
        cityData: [],
        loading: true,
    
        columnDefs: [
          {
            headerName: "Country",
            field: "CountryName",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "State",
            field: "StateName",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "City",
            field: "CityName",
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
          width: 400,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
    })

    let cityObj=[];
    let rowDataT=[];

     // stateDataArray;
  const loadCityData = () => {
    axios
      .get("http://localhost:5000/api/get-city", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        // if(response.data.length==0){this.cityObj=["temp"];}
        // else{
        cityObj = res.data;
        // }
        console.log("response", res.data);
        setDatas((prevState)=>({
            ...prevState,
            cityData: res.data,
            loading: false
        }));
        rowDataT = [];

        cityObj.map(data => {
          let temp = {
            data,
            CountryName: data["state"][0]["country"][0]["CountryName"],
            StateName: data["state"][0]["StateName"],
            CityName: data["CityName"]
          };

          rowDataT.push(temp);
        });
        setDatas((prevState)=>({
            ...prevState,
            rowData: rowDataT 
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onCityDelete = e => {
    console.log(e);
    // let body= "ID=" + e;
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete("http://localhost:4000/api/delete-city/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          loadCityData();
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
    loadCityData()
  })

 const renderButton=(params)=> {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => onCityDelete(params.data.data["_id"])}
      />
    );
  }
  const renderEditButton=(params)=> {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => cities.onEditCity(params.data.data)}
      />
    );
  }
  return (
    <div>
      <div id="table-outer-div-scroll">
        <h2 id="role-title">City Details</h2>
        {/* <Link to="/admin/role/form"> */}
        {/* <button id="add-button" >
          
          Add
        </button> */}
        <Button
          variant="primary"
          id="add-button"
          onClick={cities.onAddCity}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        {/* </Link> */}
        <div id="clear-both" />

        {!Datas.loading ? (
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
              columnDefs={Datas.columnDefs}
              defaultColDef={Datas.defaultColDef}
              columnTypes={Datas.columnTypes}
              rowData={Datas.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={Datas.getRowHeight}
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

export default CityTable;
