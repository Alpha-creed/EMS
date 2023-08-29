import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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

const PersonalInfoTable = ({onEditPersonalInfo,back,data}) => {
    const [values,setValues] = useState({
        personalInfoData: [],
        loading: true,
    
        columnDefs: [
          {
            headerName: "First Name",
            field: "FirstName",
            sortable: true,
            // filter: true ,
            width: 110,
          },
          {
            headerName: "Middle Name",
            field: "MiddleName",
            sortable: true,
            // filter: true ,
            width: 130,
          },
          {
            headerName: "Last Name",
            field: "LastName",
            sortable: true,
            // filter: true ,
            // width: 150,
          },
          {
            headerName: "Gender",
            field: "Gender",
            sortable: true,
            width: 90,
    
            // filter: true ,
            // width: 150,
          },
          {
            headerName: "Contact No",
            field: "ContactNo",
            sortable: true,
            // filter: true ,
            // width: 150,
          },
          {
            headerName: "Email",
            field: "Email",
            sortable: true,
            // filter: true ,
            // width: 150,
          },
          {
            headerName: "PANcard No",
            field: "PANcardNo",
            sortable: true,
            // filter: true ,
            // width: 150,
          },
    
          {
            headerName: "DOB",
            field: "DOB",
            sortable: true,
            filter: true,
            type: ["dateColumn"],
            filter: "agDateColumnFilter"
          },
          {
            headerName: "Hobbies",
            field: "Hobbies",
            sortable: true,
            // filter: true ,
            // width: 150,
          },
          {
            headerName: "Present Address",
            field: "PresentAddress",
            sortable: true,
            // filter: true ,
            width: 150,
          },
          {
            headerName: "",
            field: "edit",
            filter: false,
            width: 30,
            // cellRenderer:this.ageCellRendererFunc,
            // cellRendererFramework: function(params) {
            //   return <button OnClick={console.log("pa",params)}>Test</button>;
            // },
            cellRendererFramework: renderEditButton,
    
    
          },
    
    
        ],
        rowData: [],
        defaultColDef: {
          resizable: true,
          width: 120,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
      
    })

   let personalInfoObj = [];
  let rowDataT = [];
  const loadPersonalInfoData = () => {
    axios
      .get("http://localhost:5000/api/get-personal-info/" + data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        personalInfoObj = response.data;
        console.log("response", response.data);
        setValues((prevState)=>({
            ...prevState,
            personalInfoData: response.data,
            loading: false
        }))
        rowDataT = [];
        console.log("personalInfoObj", personalInfoObj)
        // this.personalInfoObj.map(data => {
        let data = personalInfoObj;
        let temp = {
          data,
          FirstName: data["FirstName"] || "Not Avaiable",
          MiddleName: data["MiddleName"] || "Not Avaiable",
          LastName: data["LastName"] || "Not Avaiable",
          Gender: data["Gender"] || "Not Avaiable",
          ContactNo: data["ContactNo"] || "Not Avaiable",
          Email: data["Email"] || "Not Avaiable",
          PANcardNo: data["PANcardNo"] || "Not Avaiable",
          DOB: data["DOB"].slice(0, 10) || "Not Avaiable",
          Hobbies: data["Hobbies"] || "Not Avaiable",
          PresentAddress: data["PresentAddress"] || "Not Avaiable",

        };

        rowDataT.push(temp);
        // });
        // console.log("rowData",this.state.rowData)
        setValues((prevState)=>({
            ...prevState,
            rowData: rowDataT
        }))

      })
      .catch(error => {
        console.log(error);
      });
  };

 const onPersonalInfoDelete = e => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:5000/api/delete-personalInfo/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
            loadPersonalInfoData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  
useEffect(()=>{
    loadPersonalInfoData();
  })
 const renderEditButton=(params)=> {
    console.log(params);
    if (back) { return <React.Fragment /> }
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => onEditPersonalInfo(params.data.data)}
    />;
  }

  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Employee Personal Details {back ? "of " + data["FirstName"] + " " + data["LastName"] : ""}</h2>
    {/* 
    <Button
      variant="primary"
      id="add-button"
      onClick={this.props.onAddPersonalInfo}
    >
      <FontAwesomeIcon icon={faPlus} id="plus-icon" />
      Add
    </Button> */}
    {back ? (<Link to="/hr/employee">
      <Button
        variant="primary"
        id="add-button"
      >
        Back
    </Button>
    </Link>) : <React.Fragment />}


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

export default PersonalInfoTable
