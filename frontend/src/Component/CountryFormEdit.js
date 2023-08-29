import React, { useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";

const CountryFormEdit = (country) => {
    const {editData,onCountryEditUpdate,onFormEditClose} = country
    const [CountryData,setCountryData] = useState(editData["CountryName"])

    const onChange=(e)=>{
        setCountryData(e.target.value)
    }

  return (
    <div>
       <h2 id="role-form-title">Edit Country Details</h2>

<div id="role-form-outer-div">
  <Form
    id="form"
    onSubmit={e =>
      onCountryEditUpdate(
        editData,
        e
        //   e.target[1].value
      )
    }
  >
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        Country
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="Text"
          placeholder="Country"
          name="CountryName"
          required
          value={CountryData}
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

export default CountryFormEdit
