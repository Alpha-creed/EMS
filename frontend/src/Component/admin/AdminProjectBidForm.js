import React, { useEffect, useState } from 'react'
import axios from "axios";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

const AdminProjectBidForm = ({onFormClose,onProjectBidSubmit}) => {
    const [values,setValues] = useState({
        status: "",
        portalsInfo: []
    })
    let portalsData = [];
   const handleChange = event => {
      setValues((prevState)=>({
        ...prevState,
        status: event.target.value           
     }))
    };
  const  loadPortalsInfo = () => {
      axios
        .get("http://localhost:5000/api/admin/get-portal", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(response => {
          // i
          portalsData = response.data;
  
          portalsData = portalsData.filter(data => data["Status"] == 1);
  
          setValues((prevState)=>({
            ...prevState,
            portalsInfo: response.data           
         }))
        })
        .catch(error => {
          console.log(error);
        });
    };
    useEffect(()=>{
        loadPortalsInfo();
    })
  return (
    <>
       <h2 id="role-form-title">Add Project Bid Details</h2>
        {/* <div id="role-form-outer-div">
          <div id="role-form-inner-div"> */}

        <div id="role-form-outer-div">
          <Form id="form" onSubmit={onProjectBidSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Project Title
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Project Title"
                  name="ProjectTitle"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Project URL
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Project URL"
                  name="ProjectURL"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Project Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="textarea" rows="3" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Portals
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="CompanyID" required>
                  {portalsData.map((data, index) => (
                    <option value={data["_id"]}>{data["PortalName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Estimated Time
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Estimated Time"
                  name="EstimatedTime"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Estimated Cost
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Estimated Cost"
                  name="EstimatedCost"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Resource
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Resource1</option>
                  <option value="2">Resource2</option>
                  <option value="3">Resource3</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Status
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Open</option>
                  <option value="1">Close</option>
                  <option value="1">Cancel</option>
                  <option value="1">Award</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Remark
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="textarea" rows="3" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={onFormClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      
    </>
  )
}

export default AdminProjectBidForm
