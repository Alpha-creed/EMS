import React from 'react'

const WorkExperienceForm = ({onFormClose,onWorkExperienceSubmit}) => {
  return (
    <div>
         <h2 id="role-form-title">Add WorkExperience Details</h2>
 <div id="role-form-outer-div"><Form id="form" onSubmit={onWorkExperienceSubmit}>
  

  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Company Name
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="Text" placeholder="CompanyName" required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Designation
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="Text" placeholder="Designation" required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    FromDate
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="date" required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    ToDate
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="date" placeholder="ToDate" required/>
    </Col>
  </Form.Group>
 
  

  <Form.Group as={Row} id="form-submit-button">
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Group>
  <Form.Group as={Row} id="form-cancel-button">
    <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
      <Button type="reset" onClick={onFormClose}>cancel</Button>
    </Col>
  </Form.Group>
</Form></div>
     
    </div>
  )
}

export default WorkExperienceForm
