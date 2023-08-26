import React, { useEffect, useState } from 'react'
// import "./AdminSalaryTable.css";
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

const SalaryTable = (props) => {
    const {onEditSalary,onAddSalary} = props
    const [values,setValues] = useState({
        salaryData: [],
        loading: true,
    
    
        columnDefs: [
          {
            headerName: "Employee Name",
            field: "EmployeeName",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Salary",
            field: "BasicSalary",
            sortable: true,
            type: "numberColumn",
            filter: 'agNumberColumnFilter'
            // filter: true ,
          },
          {
            headerName: "Bank Name",
            field: "BankName",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Account No",
            field: "AccountNo",
            sortable: true
            // filter: true ,
          },
    
          {
            headerName: "Account Holder Name",
            field: "AccountHolderName",
            sortable: true,
            // width: 117,
            // filter: true ,
          },
          {
            headerName: "IFSC code",
            field: "IFSCcode",
            sortable: true,
            // width: 117,
            // filter: true ,
          },
          {
            headerName: "Tax Deduction",
            field: "TaxDeduction",
            sortable: true
            // filter: true ,
          },
    
          {
            headerName: "",
            field: "edit",
            filter: false ,
            width: 30,
            cellRendererFramework: renderEditButton,
          
        
          },
          {
            headerName: "",
            field: "delete",
            filter: false ,
            width: 30,
            cellRendererFramework: renderButton,
          
        
          },
          
        ],
        rowData: [],
        defaultColDef: {
          resizable: true,
          width: 200,
          filter: "agTextColumnFilter"
          // filter: true ,
        },
        getRowHeight: function(params) {
          return 35;
        }
    
    
    })
    let salaryObj = [];
    let rowDataT = [];
  
   const loadSalaryData = () => {
      axios
        .get("http://localhost:5000/api/get-salary", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          salaryObj = response.data;
          console.log("response", response.data);
          setValues((prevState)=>({
            ...prevState,
            loading: false,
            salaryData: response.data,
            
          }))

          rowDataT = [];
  
          salaryObj.map(data => {
            let temp = {
              data,
              EmployeeName: data["FirstName"]+""+data["MiddleName"]+""+data["LastName"],
              BasicSalary: data["salary"][0]["BasicSalary"],
              BankName: data["salary"][0]["BankName"],
              AccountNo:data["salary"][0]["AccountNo"],
              AccountHolderName: data["salary"][0]["AccountHolderName"],
              IFSCcode: data["salary"][0]["IFSCcode"],
              TaxDeduction:data["salary"][0]["TaxDeduction"],
              
            };
            
            rowDataT.push(temp);
          });
          setValues((prevState)=>({
            ...prevState,
            rowData:rowDataT
          }))
    
  
        })
        .catch(error => {
          console.log(error);
        });
    };
  
  const onSalaryDelete = e => {
      console.log(e);
      if (window.confirm("Are you sure to delete this record? ") == true) {
        axios
          .delete("http://localhost:5000/api/delete-salary/" + e, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            loadSalaryData()
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    useEffect(()=>{
        loadSalaryData()
    })
    const renderButton=(params)=>{
      console.log(params);
      return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onSalaryDelete(params.data.data["_id"])}
    />;
    }
   const  renderEditButton=(params)=>{
      console.log(params);
      return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => onEditSalary(params.data.data)}
    />;
    }
  
  return (
    <div>
       <div id="table-outer-div-scroll">
        <h2 id="role-title">Salary Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={onAddSalary}
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

    </div>
  )
}

export default SalaryTable
