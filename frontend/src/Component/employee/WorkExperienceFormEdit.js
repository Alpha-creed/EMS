import React, { useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const WorkExperienceFormEdit = ({editData,onFormEditClose,onWorkExperienceEditUpdate}) => {
    const [values,setValues] = useState({
        CompanyNameData: editData["CompanyName"],
        DesignationData: editData["Designation"],
        FromDateData: editData["FromDate"].slice(0, 10),
        ToDateData: editData["ToDate"].slice(0, 10),
    })
   const onCompanyNameDataChange=(e)=> {
         setValues((prevState)=>({
                ...prevState,
                CompanyNameData: e.target.value
            }))
      }
    const  onDesignationDataChange=(e)=> {
         setValues((prevState)=>({
                ...prevState,
                DesignationData: e.target.value
            }))
      }
     const onFromDateDataChange=(e)=> {
         setValues((prevState)=>({
                ...prevState,
                FromDateData: e.target.value 
            }))
      }
     const onToDateDataChange=(e)=> {
         setValues((prevState)=>({
                ...prevState,
                ToDateData: e.target.value
            }))
      }
    
  return (
    <div>
          <h2 id="role-form-title">Edit WorkExperience Details</h2>

<div id="role-form-outer-div">
  <Form
    id="form"
    onSubmit={e =>
      onWorkExperienceEditUpdate(editData, e)
    }
  >
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
      Company Name
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="Text"
          placeholder="Company Name"
          required
          value={values.CompanyNameData}
          onChange={value => onCompanyNameDataChange(value)}
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
      Designation
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="Text"
          placeholder="Designation"
          required
          value={values.DesignationData}
          onChange={value => onDesignationDataChange(value)}
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
      FromDate
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="date"
          required
          value={values.FromDateData}
          onChange={value => onFromDateDataChange(value)}
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
      ToDate
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="date"
          required
          value={values.ToDateData}
          onChange={value => onToDateDataChange(value)}
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

export default WorkExperienceFormEdit
