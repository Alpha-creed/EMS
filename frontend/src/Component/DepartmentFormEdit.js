import React, { useEffect, useState } from 'react'

const DepartmentFormEdit = (props) => {
    const {editData,onDepartmentEditUpdate,onFormEditClose} = props
    const [DepartmentData,setDepartmentData] = useState(editData["DepartmentName"])
    const [companyInfo,setCompanyInfo] = useState([])

    const onChange=(e)=>{
        setDepartmentData(e.target.value)
    }
    let companyData = [];
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
   
      useEffect(()=>{
        loadCompanyInfo()
      })
    
  return (
    <div>
        <h2 id="role-form-title">Edit Department Details</h2>

<div id="role-form-outer-div">
  <Form
    id="form"
    onSubmit={e =>
      onDepartmentEditUpdate(editData, e)
    }
  >
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
            <option
              value={data["_id"]}
              selected={
                editData["company"][0]["_id"] == data["_id"]
              }
            >
              {data["CompanyName"]}
            </option>
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
          name="DepartmentName"
          required
          value={DepartmentData}
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

export default DepartmentFormEdit
