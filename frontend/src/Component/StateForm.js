import React, { useEffect, useState } from 'react'

const StateForm = (props) => {
    const {onStateSubmit,onFormClose} = props
    const [countryInfo,setCountryInfo] = useState([])

   let countryData = [];
  const loadCountryInfo = () => {
    axios
      .get("http://localhost:5000/api/get-country", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        countryData = response.data;
        setCountryInfo(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(()=>{
    loadCountryInfo()
  })
  
  return (
    <div>
         <h2 id="role-form-title">Add State Details</h2>

<div id="role-form-outer-div">
  <Form id="form" onSubmit={onStateSubmit}>
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        Country
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control as="select" name="country" required>
          <option value="" disabled selected>
            Select your option
          </option>
          {countryData.map((data, index) => (
            <option value={data["_id"]}>{data["CountryName"]}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>

    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        State
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="Text"
          placeholder="State"
          name="State"
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

export default StateForm
