import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CompanyForm = (company) => {
    const {onCompanySubmit,onFormClose} = company
    const [Datas,setDatas]=useState({
        countryData: [],
        stateData: [],
        cityData: [],
        filteredCountryData: [],
        filteredStateData: [],
        filteredCityData: [],
    })

    const loadCountryInfo=()=>{
    axios
      .get("http://localhost:5000/api/get-country", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        setDatas((prevState)=>({
            ...prevState,
            countryData: res.data
        }))
      })
      .catch(error => {
        console.log(error);
      });
    }

    const loadStateInfo = () => {
        axios
          .get("http://localhost:5000/api/get-state", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            this.setState({ stateData: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      };
     const loadCityInfo = () => {
        axios
          .get("http://localhost:5000/api/get-city", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(res => {
            setDatas((prevState)=>({
                ...prevState,
                cityData: res.data
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

      onCountryChange=(e)=> {
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
        this.setState({ filteredCityData: filteredCity });
        setDatas((prevState)=>({
            ...prevState,
            filteredCityData: filteredCity
        }))      
    }
  return (
    <div>
    <h2 id="role-form-title">Add Company Details</h2>
    <div id="role-form-outer-div">
      <Form id="form" onSubmit={onCompanySubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Company Name
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control
              type="Text"
              placeholder="Company Name"
              name="CompanyName"
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
              <option disabled selected>
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
            <Form.Control type="number" placeholder="PostalCode" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Website
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="Text" placeholder="Website" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="email" placeholder="Email" required />
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
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Contact No
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="Text" placeholder="Contact No" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            FaxNo
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="Text" placeholder="FaxNo" required />
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
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            GSTNo
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="Text" placeholder="GSTNo" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            CINNo
          </Form.Label>
          <Col sm={10} className="form-input">
            <Form.Control type="Text" placeholder="CINNo" required />
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

    {/* </div>
    </div> */}
  </div>
  )
}

export default CompanyForm
