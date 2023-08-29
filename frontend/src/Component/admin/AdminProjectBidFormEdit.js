import React, { useEffect, useState } from 'react'

const AdminProjectBidFormEdit = ({editData,onFormEditClose,onProjectBidEditUpdate}) => {
    const [values,setValues]=useState({
        status: '',
        portalsInfo: [],
        ProjectTitleData: editData["ProjectTitle"],
        ProjectURLData: editData["ProjectURL"],
        ProjectDescriptionData: editData["ProjectDesc"],
        EstimatedTimeData: editData["EstimatedTime"],
        EstimatedCostData:editData["EstimatedCost"],//will remove if not available
        RemarkData: editData["Remark"],
    
    })

   const onProjectTitleDataChange=(e)=> {
     setValues((prevState)=>({
        ...prevState,
        ProjectTitleData: e.target.value          
     }))
      }
    const  onProjectURLDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        ProjectURLData: e.target.value           
     }))
      }
     const onProjectDescriptionDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        ProjectDescriptionData: e.target.value           
     }))
      }
     const onPortalsDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        PortalsData: e.target.value          
     }))
      }
     const onEstimatedTimeDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        EstimatedTimeData: e.target.value           
     }))
      }
     const onEstimatedCostDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        EstimatedCostData: e.target.value     }))
      }
    const  onResourceDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        ResourceData: e.target.value     }))
      }
     const onStatusDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        StatusData: e.target.value           
     }))
      }
    const  onRemarkDataChange=(e)=> {
         setValues((prevState)=>({
        ...prevState,
        RemarkData: e.target.value     }))
      }
    
      let portalsData = [];
     const handleChange = (event) => {
         setValues((prevState)=>({
        ...prevState,
        status: event.target.value
    }))
      }
     const loadPortalsInfo = () => {
        axios
          .get("http://localhost:5000/api/admin/get-portal", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            portalsData = response.data;
    
            portalsData = portalsData.filter((data) => data["Status"] == 1);
    
             setValues((prevState)=>({
        ...prevState,
        portalsInfo: response.data     }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      useEffect(()=>{
        loadPortalsInfo()
      })
 
      
  return (
    <>
      <h2 id="role-form-title">Edit Project Bid Details</h2>
        <div id="role-form-outer-div"><Form id="form" onSubmit={e => onProjectBidEditUpdate(editData, e)}>
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Project Title
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="Text" placeholder="Project Title" name="ProjectTitle" required
                value={values.ProjectTitleData}
                onChange={value => onProjectTitleDataChange(value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Project URL
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="Text" placeholder="Project URL" name="ProjectURL" required
                value={values.ProjectURLData}
                onChange={value => onProjectURLDataChange(value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Project Description
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="textarea" rows="3" required
                value={values.ProjectDescriptionData}
                onChange={value => onProjectDescriptionDataChange(value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Portals
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select" name="CompanyID" required>
                {portalsData.map((data, index) => (
                  <option value={data["_id"]}
                    selected={
                      this.props.editData["portals"][0]["ID"] == data["ID"]
                    }
                  >{data["PortalName"]}</option>))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Estimated Time
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="number" placeholder="Estimated Time" name="EstimatedTime" required
                value={values.EstimatedTimeData}
                onChange={value => onEstimatedTimeDataChange(value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Estimated Cost
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control type="number" placeholder="Estimated Cost" name="EstimatedCost" required
                value={values.EstimatedCostData}
                onChange={value => onEstimatedCostDataChange(value)} />
            </Col>
          </Form.Group>



          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Resource
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select" required>
                <option value="1" selected={
                  editData["ResourceID"] == 1
                }>Resource1</option>
                <option value="2" selected={editData["ResourceID"] == 2}>Resource2</option>
                <option value="3" selected={editData["ResourceID"] == 3}>Resource3</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Status
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="select" required>
                <option value="1" selected={editData["Status"] == 1}>Open</option>
                <option value="2" selected={editData["Status"] == 2}>Close</option>
                <option value="3" selected={editData["Status"] == 3}>Cancel</option>
                <option value="4" selected={editData["Status"] == 4}>Award</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Remark
    </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control as="textarea" rows="3" required value={values.RemarkData}
                onChange={value => onRemarkDataChange(value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-submit-button">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-cancel-button">
            <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
              <Button type="reset" onClick={onFormEditClose}>cancel</Button>
            </Col>
          </Form.Group>
        </Form></div>
        {/* </div>
        </div> */}

    </>
  )
}

export default AdminProjectBidFormEdit
