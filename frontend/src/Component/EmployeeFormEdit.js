import React, { useEffect, useState } from 'react'

const EmployeeFormEdit = (props) => {
    const {editData,onGenderChange,onEmployeeEditUpdate,onFormEditClose} = props
    const [values,setValues] = useState({
        roleData: [],
        positionData: [],
        departmentData: [],
        GenderData: editData["Gender"],
    
        EmailData: editData["Email"],
        // PasswordData: "",
    
        FirstNameData: editData["FirstName"],
        MiddleNameData: editData["MiddleName"],
        LastNameData: editData["LastName"],
        DOBData: editData["DOB"].slice(0, 10),
        ContactNoData: editData["ContactNo"],
        EmployeeCodeData: editData["EmployeeCode"],
    
        DateOfJoiningData: editData["DateOfJoining"].slice(0, 10),
        TerminateDateData: editData["TerminateDate"].slice(0, 10)
    
        // value={this.state.EmployeeTitleData}
        // onChange={value => this.onEmployeeTitleDataChange(value)}
    })

    const onEmailDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            EmailData: e.target.value  
        }))
      }
    
      const onFirstNameDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            FirstNameData: e.target.value 
        }))
      }
      const onMiddleNameDataChange=(e)=> {
        this.setState({ MiddleNameData: e.target.value });
        setValues((prevState)=>({
            ...prevState,
            MiddleNameData: e.target.value  
        }))
      }
      const onLastNameDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            LastNameData: e.target.value 
        }))
      }
      const onContactNoDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            ContactNoData: e.target.value 
        }))
      }
     const onEmployeeCodeDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            EmployeeCodeData: e.target.value
        }))
      }
      // onPasswordDataChange(e) {
      //   this.setState({ PasswordData: e.target.value });
      // }
    
      const loadRoleInfo = () => {
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
    
     const onDOBDataChange = e => {
        console.log(e.target.value);
        setValues((prevState)=>({
            ...prevState,
            DOBData: e.target.value
        }))
      };
     const onDateOfJoiningDataChange = e => {
        console.log(e.target.value);
        setValues((prevState)=>({
            ...prevState,
            DateOfJoiningData: e.target.value
        }))
      };
     const onTerminateDateDataChange = e => {
        console.log(e.target.value);
        setValues((prevState)=>({
            ...prevState,
            TerminateDateData: e.target.value
        }))
      };
     const onGenderChanges = e => {
        setValues((prevState)=>({
            ...prevState,
            GenderData: e.target.value 
        }))
        onGenderChange(e);
      };
      useEffect(()=>{
        loadRoleInfo();
        loadPositionInfo();
        loadDepartmentInfo();
      })
  return (
    <>
       <h2 id="role-form-title">Edit Employee Details</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              onEmployeeEditUpdate(editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={values.EmailData}
                  onChange={value => onEmailDataChange(value)}

                />
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={this.state.PasswordData}
                  onChange={value => this.onPasswordDataChange(value)}
                />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Account access
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option
                    value="1"
                    selected={editData["Account"] == 1}
                  >
                    Admin
                  </option>
                  <option
                    value="2"
                    selected={editData["Account"] == 2}
                  >
                    HR
                  </option>
                  <option
                    value="3"
                    selected={editData["Account"] == 3}
                  >
                    Employee
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Role
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="role">
                  <option disabled selected>
                    Select your option
                  </option>
                  {values.roleData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={
                        editData["role"][0]["_id"] == data["_id"]
                      }
                    >
                      {data["RoleName"]}
                    </option>
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
                  onChange={onGenderChanges}
                  checked={values.GenderData == "male"}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  onChange={onGenderChanges}
                  checked={values.GenderData == "female"}
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
                  value={values.FirstNameData}
                  onChange={value => onFirstNameDataChange(value)}
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
                  value={values.MiddleNameData}
                  onChange={value => onMiddleNameDataChange(value)}
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
                  value={values.LastNameData}
                  onChange={value => onLastNameDataChange(value)}
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
                  //   value={this.props.editData["DOB"].slice(0, 10)}
                  value={values.DOBData}
                  onChange={value => onDOBDataChange(value)}
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
                  value={values.ContactNoData}
                  onChange={value => onContactNoDataChange(value)}
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
                  value={values.EmployeeCodeData}
                  onChange={value => onEmployeeCodeDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {values.departmentData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={
                        editData["department"][0]["_id"] ==
                        data["_id"]
                      }
                    >
                      {data["DepartmentName"]}
                    </option>
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
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={
                        editData["position"][0]["_id"] == data["_id"]
                      }
                    >
                      {data["PositionName"]}
                    </option>
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
                  //   value={this.props.editData["DateOfJoining"].slice(0, 10)}
                  value={values.DateOfJoiningData}
                  onChange={value => onDateOfJoiningDataChange(value)}
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
                  //   value={this.props.editData["TerminateDate"].slice(0, 10)}
                  value={values.TerminateDateData}
                  onChange={value =>onTerminateDateDataChange(value)}
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
                <Button type="reset" onClick={onFormEditClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      
    </>
  )
}

export default EmployeeFormEdit
