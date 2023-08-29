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

const AdminProjectBidTable = ({onEditProjectBid,onAddProjectBid}) => {
    const[values,setValues] = useState({
        projectBidData: [],
        loading: true,
    
        columnDefs: [
          // {
          //   headerName: "",
          //   field: "",
          //   sortable: true
          //   // filter: true ,
          // },
          // {
          //   headerName: "",
          //   field: "",
          //   sortable: true,
          //   type: "numberColumn",
          //   filter: 'agNumberColumnFilter'
          //   // filter: true ,
          // },
          {
            headerName: "Project Title",
            field: "ProjectTitle",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Portal",
            field: "PortalName",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Project URL",
            field: "ProjectURL",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Estimated Time",
            field: "EstimatedTime",
            sortable: true
            // filter: true ,
          },
          {
            headerName: "Estimated Cost",
            field: "EstimatedCost",
            sortable: true,
            type: "numberColumn",
            filter: 'agNumberColumnFilter'
            // filter: true ,
          },
          {
            headerName: "Remark",
            field: "Remark",
            sortable: true
            // filter: true ,
          },
    
    
          {
            headerName: "",
            field: "edit",
            filter: false,
            width: 30,
            cellRendererFramework: renderEditButton,
    
    
          },
          {
            headerName: "",
            field: "delete",
            filter: false,
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
        getRowHeight: function (params) {
          return 35;
        }
    })
  let  projectBidObj = [];
   let rowDataT = [];
  


 const loadProjectBidData = () => {
    axios
      .get("http://localhost:5000/api/admin/get-project-bid", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        projectBidObj = response.data;
        console.log("response", response.data);
        setValues((prevState)=>({
            ...prevState,
            projectBidData: response.data,
            loading: false
        }))
        rowDataT = [];

        projectBidObj.map(data => {
          let temp = {
            data,
            ProjectTitle: data["ProjectTitle"],
            PortalName: data["portals"][0]["PortalName"],
            ProjectURL: data["ProjectURL"],
            EstimatedTime: data["EstimatedTime"],
            EstimatedCost: data["EstimatedCost"],
            Remark: data["Remark"],

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

 const onProjectBidDelete = e => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:5000/api/admin/delete-project-bid/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
            loadProjectBidData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(()=>{
    loadProjectBidData();
  })
 const renderButton=(params)=> {
    console.log(params);
    return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onProjectBidDelete(params.data.data["_id"])}
    />;
  }
 const renderEditButton=(params)=> {
    console.log(params);
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => onEditProjectBid(params.data.data)}
    />;
  }

  return (
    <div id="table-outer-div-scroll">
    <h2 id="role-title">Bidding Details</h2>
    <Button
      variant="primary"
      id="add-button"
      onClick={onAddProjectBid}
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

export default AdminProjectBidTable
