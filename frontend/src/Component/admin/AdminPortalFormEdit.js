import React, { useState } from 'react'

const AdminPortalFormEdit = ({editData,onStatusChange,onFormEditClose,onPortalEditUpdate}) => {
    const [values,setValues] = useState({
        PortalData: editData["PortalName"],
        Status:editData["Status"]
    })
   const onChange=(e)=> {
        setValues((prevState)=>({
                ...prevState,
                PortalData: e.target.value  
              }))
      }
     const onStatusChange=(e)=>{
        setValues((prevState)=>({
                ...prevState,
                Status: e.target.value 
              }))
        onStatusChange(e)
      }
    
  return (
    <div>
        <h2 id="role-form-title">Edit Portal Details</h2>
     
     <div id="role-form-outer-div"><Form id="form"  onSubmit={e =>
            onPortalEditUpdate(
              editData,
              e.target[0].value
            )
          }>

<Form.Group as={Row}>
<Form.Label column sm={2}>
Portal
</Form.Label>
<Col sm={10}  className="form-input">
  <Form.Control type="Text" placeholder="Portal" name="PortalName" required 
  value={values.PortalData}
              onChange={value => onChange(value)}/>
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
    checked={values.Status==1}
    />
    <Form.Check
    inline
      type="radio"
      label="disable"
      value="0"
      name="status" 
      onChange={onStatusChange}  
      required      
      checked={values.Status==0}
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
  <Button type="reset" onClick={onFormEditClose}>cancel</Button>
</Col>
</Form.Group>
</Form></div>
  
    </div>
  )
}

export default AdminPortalFormEdit
