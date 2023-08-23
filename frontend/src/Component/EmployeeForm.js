import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";


const EmployeeForm = (props) => {
    const {onEmployeeSubmit,onGenderChange,onFormClose} = props
    const [values,setValues] = useState({
        roleData: [],
        positionData: [],
        departmentData: [],
    })

   const  loadRoleInfo = () => {
        axios
          .get("http://localhost:5000/api/get-role", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setValues((prevState)=>({
                ...prevState,
                roleData: response.data 
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      const loadPositionInfo = () => {
        axios
          .get("http://localhost:5000/api/get-position", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setValues((prevState)=>({
                ...prevState,
                positionData: response.data 
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      const loadDepartmentInfo = () => {
        axios
          .get("http://localhost:5000/api/get-department", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setValues((prevState)=>({
                ...prevState,
                departmentData: response.data
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
     
      useEffect(()=>{
        loadRoleInfo();
        loadPositionInfo();
        loadDepartmentInfo();
      })
  return (
    <div>
        <h2 id="role-form-title">Add Employee Details</h2>
        <div id="role-form-outer-div">
          <Form id="form" onSubmit={onEmployeeSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} >
              <Form.Label column sm={2}>
                Account access
    </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1">Admin</option>
                  <option value="2">HR</option>
                  <option value="3">Employee</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Role
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="role"
                >
                  <option disabled selected>
                    Select your option
                  </option>
                  {values.roleData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["RoleName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Gender
      </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="male"
                  name="gender"
                  onChange={onGenderChange}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  onChange={onGenderChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                First Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Middle Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Middle Name"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Last Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Last Name"

                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                DOB
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="DOB"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Contact No "

                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Employee Code
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Code"

                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="department"
                  required
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {values.departmentData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["DepartmentName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Position
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="position" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {values.positionData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["PositionName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Date Of Joining
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Date Of Joining"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Terminate Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Terminate Date"
                />
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

        {/* </div>
        </div> */}

    </div>
  )
}

export default EmployeeForm
