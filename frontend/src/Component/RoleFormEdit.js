import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const RoleFormEdit = (props) => {
    const {editData,onRoleEditUpdate,onFormEditClose} = props
    const [RoleData,setRoleData] = useState(editData["RoleName"])
    const [companyInfo,setCompnayInfo] = useState([])

    const onChange=(e)=>{
        setRoleData(e.target.value)
    }
  let companyData = [];
 const loadCompanyInfo = () => {
    axios
      .get("http://localhost:5000/api/get-company", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        companyData = response.data;
        setCompnayInfo(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(()=>{
    loadCompanyInfo()
  })

  return (
    <div>
        <h2 id="role-form-title">Edit Role Details</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              onRoleEditUpdate(
                editData,
                e.target[0].value,
                e.target[1].value
              )
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Company
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="country" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {companyData.map((data, index) => (
                    <option
                      value={data["_id"]}
                      selected={
                        editData["company"][0]["_id"] == data["_id"]
                      }
                    >
                      {data["CompanyName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Role
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Role"
                  name="RoleName"
                  required
                  value={RoleData}
                  onChange={value => onChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Update</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={onFormEditClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      
    </div>
  )
}

export default RoleFormEdit
