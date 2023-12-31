import React, { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
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

const EmployeeTable = (props) => {
    const {onEmpInfo,onEditEmployee,onAddEmployee} = props
    const [values,setValues] = useState({
        employeeData: [],
        loading: true,
    
        columnDefs: [
          {
            headerName: "Employee Code",
            field: "EmployeeCode",
            sortable: true,
            width: 140,
            // filter: true ,
          },
          {
            headerName: "Email",
            field: "Email",
            sortable: true,
            // filter: true ,
            width: 150,
          },
          {
            headerName: "Account Access",
            field: "Account",
            sortable: true,
    
            // width: 70,
            // filter: true ,
          },
          {
            headerName: "First Name",
            field: "FirstName",
            sortable: true,
            width: 110,
    
            // filter: true ,
          },
          {
            headerName: "Middle Name",
            field: "MiddleName",
            sortable: true,
            width: 130,
    
            // filter: true ,
          },
          {
            headerName: "Last Name",
            field: "LastName",
            sortable: true,
            width: 110,
    
            // filter: true ,
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
            headerName: "ContactNo",
            field: "ContactNo",
            sortable: true,
            width: 117,
            // filter: true ,
          },
    
          {
            headerName: "Role",
            field: "RoleName",
            sortable: true,
    
            width: 70,
            // filter: true ,
          },
          {
            headerName: "Position Name",
            field: "PositionName",
            sortable: true,
            width: 120,
    
            // filter: true ,
          },
          {
            headerName: "Department Name",
            field: "DepartmentName",
            sortable: true
            ,
            width: 120,
            // filter: true ,
          },
    
    
    
          {
            headerName: "Date Of Joining",
            field: "DateOfJoining",
            sortable: true
            ,
            width: 120,
            // filter: true ,
    
          },
          {
            headerName: "",
            field: "info",
            filter: false,
            width: 30,
            // cellRenderer:this.ageCellRendererFunc,
            // cellRendererFramework: function(params) {
            //   return <button OnClick={console.log("pa",params)}>Test</button>;
            // },
            cellRendererFramework:renderInfoButton,
    
    
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
            cellRendererFramework:renderEditButton,
    
    
          },
          {
            headerName: "",
            field: "delete",
            filter: false,
            width: 30,
            // cellRenderer:this.ageCellRendererFunc,
            // cellRendererFramework: function(params) {
            //   return <button OnClick={console.log("pa",params)}>Test</button>;
            // },
            cellRendererFramework:renderButton,
    
    
          },
    
        ],
        rowData: [],
        defaultColDef: {
          resizable: true,
          width: 100,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function (params) {
          return 35;
        }
      
    })
   let employeeObj = [];
   let rowDataT = [];

  const loadEmployeeData = () => {
    axios
      .get("http://localhost:5000/api/get-employee", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        employeeObj = response.data;
        console.log("response", response.data);
        setValues((prevState)=>({
            ...prevState,
            employeeData: response.data,
            loading: false
        }))
        rowDataT = [];
        employeeObj.map(data => {
          let temp = {
            data,
            Email: data["Email"],
            Password: data["Password"],
            Account: data["Account"] == 1 ? "Admin" : (data["Account"] == 2 ? "HR" : (data["Account"] == 3 ? "Employee" : "")),
            RoleName: data["role"][0]["RoleName"],
            FirstName: data["FirstName"],
            MiddleName: data["MiddleName"],
            LastName: data["LastName"],
            DOB: data["DOB"].slice(0, 10),
            ContactNo: data["ContactNo"],
            EmployeeCode: data["EmployeeCode"],
            DepartmentName: data["department"][0]["DepartmentName"],
            PositionName: data["position"][0]["PositionName"],
            DateOfJoining: data["DateOfJoining"].slice(0, 10)
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

  const onEmployeeDelete = e => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      window.alert("You are not allowed to perform this operation");
      // axios
      //   .delete("http://localhost:4000/api/employee/" + e, {
      //     headers: {
      //       authorization: localStorage.getItem("token") || ""
      //     }
      //   })
      //   .then(res => {
      //     this.componentDidMount();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }

  useEffect(()=>{
    loadEmployeeData()
  })

  handleClick = (e) => {
    console.log(e);
  }
  const renderInfoButton=(params)=> {
    console.log(params);
    return <div>
      <FontAwesomeIcon
        icon={faInfoCircle}
        onClick={() => onEmpInfo(params.data.data)}
      /></div>;
  }
 const renderButton=(params)=> {
    console.log(params);
    return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onEmployeeDelete(params.data.data["_id"])}
    />;
  }
 const renderEditButton=(params)=> {
    console.log(params);
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => onEditEmployee(params.data.data)}
    />;
  }

  const searchChange = e => {
    console.log(e.target.value);
    setValues((prevState)=>({
       ...prevState,
        searchData: e.target.value
    }))
  };
  // getFilteredEmp() {
  //   return this.employeeObj.filter(emp => {
  //     return (
  //       emp["Email"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["role"][0]["RoleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["FirstName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["MiddleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["LastName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DOB"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["ContactNo"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["EmployeeCode"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["department"][0]["DepartmentName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["position"][0]["PositionName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DateOfJoining"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase())
  //     );
  //   });
  // }

  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Employee Details</h2>

    <Button
      variant="primary"
      id="add-button"
      onClick={onAddEmployee}
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

export default EmployeeTable
