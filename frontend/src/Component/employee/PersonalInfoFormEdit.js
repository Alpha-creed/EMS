import React, { useState } from 'react'
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const PersonalInfoFormEdit = ({editData,onGenderChange,onFormEditClose,onPersonalInfoEditUpdate}) => {
    const [values,setValues] = useState({
        GenderData: editData["Gender"],

        EmailData: editData["Email"],
        FirstNameData: editData["FirstName"],
        MiddleNameData: editData["MiddleName"],
        LastNameData: editData["LastName"],
        DOBData: editData["DOB"].slice(0, 10),
        ContactNoData: editData["ContactNo"],
        EmergencyContactNoData: editData["EmergencyContactNo"] || "",
        PANcardNoData: editData["PANcardNo"] || "",
        HobbiesData: editData["Hobbies"] || "",
        PresentAddressData:editData["PresentAddress"] || "",
        PermanetAddressData: editData["PermanetAddress"] || ""
    
    })

   const vonEmailDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            FirstNameData: e.target.value
        }))
    }
    
    const  onFirstNameDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            FirstNameData: e.target.value
        }))
    }
     const onMiddleNameDataChange=(e)=> {
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
     const onPANcardNoDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            PANcardNoData: e.target.value 
        }))
    }
     const onEmergencyContactNoDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            EmergencyContactNoData: e.target.value
        }))
    }
     const onHobbiesDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            HobbiesData: e.target.value
        }))
    }
     
     const onPresentAddressDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            PresentAddressData: e.target.value
        }))
    }
     const onPermanetAddressDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            PermanetAddressData: e.target.value
        }))
    }
    
     const onGenderChange = e => {
            setValues((prevState)=>({
                ...prevState,
                GenderData: e.target.value
            }))
        onGenderChange(e);
      };
     const onDOBDataChange = e => {
        console.log(e.target.value);
            setValues((prevState)=>({
                ...prevState,
                DOBData: e.target.value
            }))
      };
    
  return (
    <>
        <h2 id="role-form-title">Edit PersonalInfo Details</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              onPersonalInfoEditUpdate(editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                First Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  required
                  disabled
                  value={values.FirstNameData}
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
                  disabled
                  value={values.MiddleNameData}
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
                  disabled
                  required
                  value={values.LastNameData}
                />
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
                  checked={values.GenderData == "male"}
                  required
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  onChange={onGenderChange}
                  checked={values.GenderData == "female"}
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
                  value={values.ContactNoData}
                  onChange={value => onContactNoDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Emergency Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Emergency Contact No"
                  required
                  value={values.EmergencyContactNoData}
                  onChange={value => onEmergencyContactNoDataChange(value)}
                />
              </Col>
            </Form.Group>

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
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                PAN Card No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="PAN Card No"
                  required
                  value={values.PANcardNoData}
                  onChange={value => onPANcardNoDataChange(value)}
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
                Blood Group
              </Form.Label>

              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option
                    value="A+"
                    selected={editData["BloodGroup"] == "A+"}
                  >
                    A+
                  </option>
                  <option
                    value="A-"
                    selected={editData["BloodGroup"] == "A-"}
                  >
                    A-
                  </option>
                  <option
                    value="B+"
                    selected={editData["BloodGroup"] == "B+"}
                  >
                    B+
                  </option>
                  <option
                    value="B-"
                    selected={editData["BloodGroup"] == "B-"}
                  >
                    B-
                  </option>
                  <option
                    value="AB+"
                    selected={editData["BloodGroup"] == "AB+"}
                  >
                    AB+
                  </option>
                  <option
                    value="AB-"
                    selected={editData["BloodGroup"] == "AB-"}
                  >
                    AB-
                  </option>
                  <option
                    value="O+"
                    selected={editData["BloodGroup"] == "O+"}
                  >
                    O+
                  </option>
                  <option
                    value="O-"
                    selected={editData["BloodGroup"] == "O-"}
                  >
                    O-
                  </option>
                  {/* 
    A+
    A-
    B+
    B-
    AB+
    AB-
    O+
    O- */}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Hobbies
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Hobbies"
                  required
                  value={values.HobbiesData}
                  onChange={value => onHobbiesDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Present Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder="Present Address"
                  required
                  value={values.PresentAddressData}
                  onChange={value => onPresentAddressDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Permanet Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder=" Permanet Address"
                  required
                  value={values.PermanetAddressData}
                  onChange={value => onPermanetAddressDataChange(value)}
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
        {/* </div>
        </div> */}

    </>
  )
}

export default PersonalInfoFormEdit
