import React, { useState } from 'react'
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";


const LeaveApplicationHRFormEdit = ({editData,onFormEditClose,onLeaveApplicationHREditUpdate}) => {
    const [values,setValues] = useState({
        FromDateData: editData["FromDate"].slice(0, 10),
        ToDateData: editData["ToDate"].slice(0, 10),
        ReasonforleaveData: editData["Reasonforleave"],
        nameData:
          editData["employee"][0]["FirstName"] +
          " " +
          editData["employee"][0]["LastName"]
        // StatusData: this.props.editData["Status"],
    
    })
  return (
    <div>
    <h2 id="role-form-title">
      Edit Leave Application Of {values.nameData}
    </h2>

    <div id="role-form-outer-div">
      <Form
        id="form"
        onSubmit={e =>
          onLeaveApplicationHREditUpdate(editData, e)
        }
      >
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Leave Type
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control as="select" required>
              <option value="" disabled selected>
                Select your option
              </option>
              <option
                value="Sick Leave"
                selected={editData["Leavetype"] == "Sick Leave"}
                disabled
              >
                Sick Leave
              </option>
              <option
                value="Casual Leave"
                selected={
                  editData["Leavetype"] == "Casual Leave"
                }
                disabled
              >
                Casual Leave
              </option>
              <option
                value="Privilege Leave"
                selected={
                  editData["Leavetype"] == "Privilege Leave"
                }
                disabled
              >
                Privilege Leave
              </option>
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
              disabled
              value={values.FromDateData}
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
              disabled
              value={values.ToDateData}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Reason for leave
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Reason for leave"
              required
              disabled
              value={values.ReasonforleaveData}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Leave Status
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control as="select" required>
              <option value="Pending" selected disabled>
                Pending
              </option>
              <option
                value="2"
                selected={editData["Status"] == 2}
              >
                Approve
              </option>
              <option
                value="3"
                selected={editData["Status"] == 3}
              >
                Reject
              </option>
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

export default LeaveApplicationHRFormEdit
