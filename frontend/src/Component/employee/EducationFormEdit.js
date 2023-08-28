import React, { useState } from 'react'

const EducationFormEdit = ({editData,onFormEditClose,onEducationEditUpdate}) => {
    const [values,setValues] = useState({
        SchoolUniversityData: editData["SchoolUniversity"],
        DegreeData: editData["Degree"],
        GradeData: editData["Grade"],
        PassingOfYearData: editData["PassingOfYear"]
    })
   const onSchoolUniversityDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            SchoolUniversityData: e.target.value
        }))

      }
    const  onDegreeDataChange=(e)=> {
         setValues((prevState)=>({
            ...prevState,
            DegreeData: e.target.value
        }))
      }
    const  onGradeDataChange=(e)=> {
         setValues((prevState)=>({
            ...prevState,
            GradeData: e.target.value
        }))
      }
    const  onPassingOfYearDataChange=(e)=> {
         setValues((prevState)=>({
            ...prevState,
            PassingOfYearData: e.target.value
        }))
      }
    
  return (
    <div>
        <h2 id="role-form-title">Edit Education Details</h2>

        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              onEducationEditUpdate(editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                School / University
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="School / University "
                  required
                  value={values.SchoolUniversityData}
                  onChange={value => onSchoolUniversityDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Degree
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Degree "
                  required
                  value={values.DegreeData}
                  onChange={value => onDegreeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Grade
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Grade"
                  required
                  value={values.GradeData}
                  onChange={value => onGradeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Passing Of Year
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Passing Of Year"
                  required
                  value={values.PassingOfYearData}
                  onChange={value => onPassingOfYearDataChange(value)}
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

export default EducationFormEdit
