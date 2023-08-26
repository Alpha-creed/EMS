import React, { useEffect, useState } from 'react'

const SalaryFormEdit = (props) => {
    const {editData,onSalaryEditUpdate,onFormEditClose} = props
    const [values,setValues] = useState({
        salaryData : [],
     
        // status: '',
        // portalsInfo:[],
        // SalaryTitleData:this.props.editData["SalaryTitle"],
        // SalaryURLData:this.props.editData["SalaryURL"],
        // SalaryDescriptionData:this.props.editData["SalaryDesc"],      
        // EstimatedTimeData:this.props.editData["EstimatedTime"],   
        // RemarkData:this.props.editData["Remark"],

            BasicSalaryData:  editData["salary"][0]["BasicSalary"],
            BankNameData:editData["salary"][0]["BankName"],
            AccountNoData: editData["salary"][0]["AccountNo"],
            ReAccountNoData: editData["salary"][0]["AccountNo"],
            AccountHolderNameData:editData["salary"][0]["AccountHolderName"],
            IFSCcodeData: editData["salary"][0]["IFSCcode"],
            TaxDeductionData: editData["salary"][0]["TaxDeduction"],
      

    })
    const onBasicSalaryDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            BasicSalaryData: e.target.value 
        }))
      }
     const onBankNameDataChange=(e)=> {
        setValues((prevState)=>({
            ...prevState,
            BankNameData: e.target.value
        }))
      }
    const  onAccountNoDataChange=(e) =>{
          setValues((prevState)=>({
            ...prevState,
            AccountNoData: e.target.value 
        }))
      }
    const  onReAccountNoDataChange=(e) =>{
          setValues((prevState)=>({
            ...prevState,
            ReAccountNoData: e.target.value 
        }))
      }
    const  onAccountHolderNameDataChange=(e) =>{
          setValues((prevState)=>({
            ...prevState,
            AccountHolderNameData: e.target.value
        }))
      }
    const  onIFSCcodeDataChange=(e) =>{
          setValues((prevState)=>({
            ...prevState,
            IFSCcodeData: e.target.value
        }))
      }
    const  onTaxDeductionDataChange=(e) =>{
          setValues((prevState)=>({
            ...prevState,
            TaxDeductionData: e.target.value 
        }))
      }

     
      
     const loadSalaryInfo = () => {
        axios
          .get("http://localhost:5000/api/get-salary", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setValues((prevState)=>({
                ...prevState,
                salaryData: response.data
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      useEffect(()=>{
        loadSalaryInfo()
      })
  return (
    <>
       <h2 id="role-form-title">Edit Salary Details
        {/* {JSON.stringify(this.props.editData ) } */}
        </h2>       
 <div id="role-form-outer-div"><Form id="form" onSubmit={e=>onSalaryEditUpdate(editData,e)}>
  
 <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Select Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  required
                >
                   {/* <option value="" disabled selected>Select your option</option> */}
                  {values.salaryData.map((data, index) => (
                    <option key={index} value={data["_id"]}
                    selected={editData["_id"] == data["_id"]} disabled>{data["FirstName"]+" "+data["MiddleName"]+" "+data["LastName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>


            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Basic Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                  value={values.BasicSalaryData}
        onChange={value => onBasicSalaryDataChange(value)}
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Bank Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Bank Name"
                  required
                  value={values.BankNameData}
        onChange={value => onBankNameDataChange(value)}
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Account No"
                  required
                  value={values.AccountNoData}
        onChange={value => onAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Re-Enter Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Re-Enter Account No"
                  required
                  value={values.ReAccountNoData}
                  onChange={value => onReAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Account Holder Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Account Holder Name"
                  required
                  value={values.AccountHolderNameData}
        onChange={value => onAccountHolderNameDataChange(value)}
                />
              </Col>
            </Form.Group>
     
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              IFSC Code
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="IFSC Code"
                  required
                  value={values.IFSCcodeData}
        onChange={value => onIFSCcodeDataChange(value)}
                />
              </Col>
            </Form.Group>

            
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
              Tax Deduction
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                  value={values.TaxDeductionData}
        onChange={value => onTaxDeductionDataChange(value)}
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
      <Button type="reset" onClick={onFormEditClose}>cancel</Button>
    </Col>
  </Form.Group>
</Form></div>
          {/* </div>
        </div> */}
    </>
  )
}

export default SalaryFormEdit
