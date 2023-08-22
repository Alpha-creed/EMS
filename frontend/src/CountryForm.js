import React from 'react'
import { Form,Button,Col,Row } from "react-bootstrap";


const CountryForm = (country) => {
    const {onCountrySubmit,onFormClose} = country
  return (
    <div>
      <div>
  
  <h2 id="role-form-title">Add Country Details</h2>

      
    <div id="role-form-outer-div">
    <Form id="form" onSubmit={onCountrySubmit}>



    <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Country
    </Form.Label>
    <Col sm={10}  className="form-input">
    <Form.Control type="Text" placeholder="Country" name="Country" required/>
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
    </Form>
    </div>





    {/* </div>
  </div> */}
</div>
    </div>
  )
}

export default CountryForm
