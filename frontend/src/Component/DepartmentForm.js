import React, { useState } from 'react'

const DepartmentForm = (props) => {
    const {onDepartmentSubmit,onFormClose} = props;
    const [companyInfo,setCompanyInfo] = useState([])
    let companyData=[];

    const loadCompanyInfo = () => {
        axios
          .get("http://localhost:5000/api/get-company", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            // if(response.data.length==0){this.roleObj=["temp"];}
            // else{
    
            // }
            companyData = response.data;
    
            // this.portalsData=this.portalsData.filter((data)=>data["Status"]==1);
            setCompanyInfo(response.data)
          })
          .catch(error => {
            console.log(error);
          });
      };
      

  return (
    <div>
        <h2 id="role-form-title">Add Department Details</h2>

<div id="role-form-outer-div">
  <Form id="form" onSubmit={onDepartmentSubmit}>
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
            <option value={data["_id"]}>{data["CompanyName"]}</option>
          ))}
        </Form.Control>
      </Col>
    </Form.Group>

    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        Department
      </Form.Label>
      <Col sm={10} className="form-input">
        <Form.Control
          type="Text"
          placeholder="Department"
          name="Department"
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

export default DepartmentForm
