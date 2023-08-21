import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const CompanyFormEdit = (company) => {
    const{editData,onCompanyEditUpdate,onFormEditClose}=company
    const [Datas,setDatas]=useState({
        status: "",
        countryData: [],
        stateData: [],
        cityData: [],
        filteredCountryData: [],
        filteredStateData: [],
        filteredCityData: [], 
    
        CompanyNameData: editData["CompanyName"],
        AddressData:editData["Address"],
        PostalCodeData:editData["PostalCode"],
        WebsiteData: editData["Website"],
        EmailData: editData["Email"],
        ContactPersonData: editData["ContactPerson"],
        ContactNoData: editData["ContactNo"],
        FaxNoData: editData["FaxNo"],
        PanNoData: editData["PanNo"],
        GSTNoData: editData["GSTNo"],
        CINNoData: editData["CINNo"],
    })
    const onCompanyNameDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            CompanyNameData: e.target.value
        }))
      }
      const onAddressDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            AddressData: e.target.value
        }))
      }
     const onPostalCodeDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            PostalCodeData: e.target.value
        }))
      }
      const onWebsiteDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            WebsiteData: e.target.value
        }))
      }
     const onEmailDataChange=(e) =>{
        setDatas((prevState)=>({
            ...prevState,
            EmailData: e.target.value
        }))
      }
     const onContactPersonDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            ContactPersonData: e.target.value
        }))
      }
      const onContactNoDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            ContactNoData: e.target.value
        }))
      }
      const onFaxNoDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            FaxNoData: e.target.value 
        }))
      }
      const onPanNoDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            PanNoData: e.target.value 
        }))
      }
      const onGSTNoDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            GSTNoData: e.target.value
        }))
      }
     const onCINNoDataChange=(e)=> {
        setDatas((prevState)=>({
            ...prevState,
            CINNoData: e.target.value
        }))
      }
    
    
      loadCountryInfo = () => {
        axios
          .get("http://localhost:5000/api/get-country", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setDatas((prevState)=>({
                ...prevState,
                countryData: response.data
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      loadStateInfo = () => {
        axios
          .get("http://localhost:5000/api/get-state", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setDatas((prevState)=>({
                ...prevState,
                stateData: response.data 
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      loadCityInfo = () => {
        axios
          .get("http://localhost:5000/api/get-city", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            setDatas((prevState)=>({
                ...prevState,
                cityData: response.data 
            }))
          })
          .catch(error => {
            console.log(error);
          });
      };
      useEffect(()=>{
        loadCountryInfo();
        loadStateInfo();
        loadCityInfo();
      })

      const onCountryChange=(e)=> {
        console.log(e.target.value);
        let currentCountry = e.target.value;
    
        let filteredState = Datas.stateData.filter(
          data => data["country"][0]["_id"] == currentCountry
        );
        setDatas((prevState)=>({
            ...prevState,
            filteredStateData: filteredState
        }))    
      }
      const onStateChange=(e)=> {
        console.log(e.target.value);
        let currentState = e.target.value;
        let filteredCity = Datas.cityData.filter(
          data => data["state"][0]["_id"] == currentState
        );
        setDatas((prevState)=>({
            ...prevState,
            filteredCityData: filteredCity
        })) 
      }

  return (
    <>
        <h2 id="role-form-title">Edit Project Bid Details</h2>
        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              onCompanyEditUpdate(editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Company Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Company Name"
                  name="CompanyName"
                  value={Datas.CompanyNameData}
                  onChange={value =>onCompanyNameDataChange(value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder="address"
                  required
                  value={Datas.AddressData}
                  onChange={value => onAddressDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Country
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="select"
                  name="country"
                  onChange={onCountryChange}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {Datas.countryData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["CountryName"]}</option>
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
                  as="select"
                  name="state"
                  required
                  onChange={onStateChange}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {Datas.filteredStateData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["StateName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                City
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="state" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {Datas.filteredCityData.map((data, index) => (
                    <option key={index} value={data["_id"]}>{data["CityName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                PostalCode
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="number" placeholder="PostalCode" required value={this.state.PostalCodeData}
                  onChange={value => onPostalCodeDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Website
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Website" required value={this.state.WebsiteData}
                  onChange={value => onWebsiteDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="email" placeholder="Email" required value={this.state.EmailData}
                  onChange={value => onEmailDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact Person
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Contact Person"
                  required
                  value={Datas.ContactPersonData}
                  onChange={value => onContactPersonDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Contact No" required value={this.state.ContactNoData}
                  onChange={value => onContactNoDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                FaxNo
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="FaxNo" required value={this.state.FaxNoData}
                  onChange={value => onFaxNoDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                PanCard No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder=" PanCard No  "
                  required
                  value={Datas.PanNoData}
                  onChange={value => onPanNoDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                GSTNo
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="GSTNo" required value={this.state.GSTNoData}
                  onChange={value =>onGSTNoDataChange(value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                CINNo
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="CINNo" required value={this.state.CINNoData}
                  onChange={value =>onCINNoDataChange(value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
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

    </>
  )
}

export default CompanyFormEdit
