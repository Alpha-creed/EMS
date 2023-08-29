import React, { useState } from 'react'

const AdminPortalForm = ({onFormClose,onPortalSubmit,onStatusChange}) => {
    const [status,setStatus] = useState("")
   const handleChange = event => {
        setStatus(event.target.value)
      };
    return (
    <div>
    <h2 id="role-form-title">Add Portal Details</h2>
    <div id="role-form-outer-div">
      <Form id="form" onSubmit={onPortalSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Portal
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Portal"
              name="Portal"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Status
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              inline
              type="radio"
              label="enable"
              value="1"
              name="status"
              onChange={onStatusChange}
              required
            />
            <Form.Check
              inline
              type="radio"
              label="disable"
              value="0"
              name="status"
              onChange={onStatusChange}
              required
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
  </div>
  )
}

export default AdminPortalForm
