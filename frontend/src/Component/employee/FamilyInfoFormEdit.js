import React, { useState } from 'react'

const FamilyInfoFormEdit = ({editData,onFormEditClose,onFamilyInfoEditUpdate}) => {
    const [values,setValues] = useState({
        NameData: editData["Name"],
        RelationshipData: editData["Relationship"],
        DOBData: editData["DOB"].slice(0, 10),
        OccupationData: editData["Occupation"]
    })

   const onNameDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            NameData: e.target.value
        }))
      }
    const  onRelationshipDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            RelationshipData: e.target.value
        }))
      }
     const onOccupationDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            OccupationData: e.target.value 
        }))
      }
    const  onDOBDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            DOBData: e.target.value
        }))
      }
  return (
    <div>
    <h2 id="role-form-title">Edit FamilyInfo Details</h2>

    <div id="role-form-outer-div">
      <Form
        id="form"
        onSubmit={e =>
          onFamilyInfoEditUpdate(editData, e)
        }
      >
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
          Name
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Name"
              required
              value={values.NameData}
              onChange={value => onNameDataChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
          Relationship
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Relationship"
              required
              value={values.RelationshipData}
              onChange={value => onRelationshipDataChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
          DOB
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="date"
              placeholder="Grade"
              required
              value={values.DOBData}
              onChange={value => onDOBDataChange(value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
          Occupation
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder=" Occupation"
              required
              value={values.OccupationData}
              onChange={value => onOccupationDataChange(value)}
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

export default FamilyInfoFormEdit
