import React, { useState } from 'react'

const LeaveApplicationEmpFormEdit = ({editData,onFormEditClose,onLeaveApplicationEmpEditUpdate}) => {
    const [values,setValues] = useState({
        FromDateData: editData["FromDate"].slice(0, 10),
        ToDateData: editData["ToDate"].slice(0, 10),
        ReasonforleaveData: editData["Reasonforleave"],
    })

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
     const onReasonforleaveDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            ReasonforleaveData: e.target.value
        }))
      }
  return (
    <div>
         <h2 id="role-form-title">Edit LeaveApplicationEmp Details</h2>

<div id="role-form-outer-div">
  <Form
    id="form"
    onSubmit={e =>
      onLeaveApplicationEmpEditUpdate(editData, e)
    }
  >
   <Form.Group as={Row} >
<Form.Label column sm={2}>
Leave Type
</Form.Label>
<Col sm={10} className="form-input">
<Form.Control as="select"  required>
<option value="" disabled selected>
            Select your option
          </option>
<option value="Sick Leave"  selected={editData["Leavetype"] == "Sick Leave"}>Sick Leave</option>
<option value="Casual Leave"  selected={editData["Leavetype"] == "Casual Leave"}>Casual Leave</option>
<option value="Privilege Leave"  selected={editData["Leavetype"] == "Privilege Leave"}>Privilege Leave</option>
  </Form.Control>
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
<Form.Group as={Row}>
<Form.Label column sm={2}>
Reason for leave
</Form.Label>
<Col sm={10}  className="form-input">
<Form.Control type="Text" placeholder="Reason for leave" required
value={values.ReasonforleaveData}
onChange={value => onReasonforleaveDataChange(value)}/>
</Col>
</Form.Group>

<Form.Group as={Row} >
<Form.Label column sm={2}>
Leave Status
</Form.Label>
<Col sm={10} className="form-input">
<Form.Control as="select"  required>
<option value="1" selected disabled>Pending</option>
  </Form.Control>
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

export default LeaveApplicationEmpFormEdit
