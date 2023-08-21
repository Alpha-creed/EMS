import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'

const CityForm = (cities) => {
    // const [stateData,setStateData] = useState([])
    // const [filteredStateData,setFilteredStateData] = useState([])
    // const [countryData,setCountryData] = useState([])
    // const [filteredCountryData,setfilteredCountryData] = useState([])
    const [Datas,setDatas]=({
        stateData:[],
        filteredStateData:[],
        countryData:[],
        filteredCountryData:[],
        CityData:"",
    })
    useEffect(()=>{
        loadCountryInfo();
        loadStateInfo();
    })
    const onChange=(e)=>{
        setDatas((prevState) => ({
            ...prevState,
            CityData:e.target.value
          }));
    }

    const loadCountryInfo=()=>{
        axios
            .get("http://localhost:5000/api/get-country",{
                headers: {
                    authorization: localStorage.getItem("token") || ""
                  }
            })
            .then(res=>{
                setDatas((prevState) => ({
                    ...prevState,
                    countryData:res.data
                  }));
            })
            .catch(error => {
                console.log(error);
              });
    }
    const loadStateInfo=()=>{
        axios
            .get("http://localhost:5000/api/get-state",{
                headers: {
                    authorization: localStorage.getItem("token") || ""
                  }
            })
            .then(res=>{
                setDatas((prevState) => ({
                    ...prevState,
                    stateData:res.data
                  }));
            })
            .catch(error => {
                console.log(error);
              });
    }

    const onCountryChange=(e)=>{
        console.log(e.target.value)
        let currentCountry = e.target.value;
        let filteredState = Datas.stateData.filter(
            data=>data["country"][0]["_id"] == currentCountry
        );
        setDatas((prevState)=>({
            ...prevState,
            filteredStateData:filteredState
        }))
    }
    return (
    <div>
      <h2>Add City Details</h2>
      <div>
        <Form id="form" onSubmit={cities.onCitySubmit}>
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
                        <option value={data["_id"]}>{data["CountryName"]}</option>
                    ))}
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                State
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="state" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {Datas.filteredStateData.map((data, index) => (
                    <option value={data["_id"]}>{data["StateName"]}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                City
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="City"
                  name="City"
                  required
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
                <Button type="reset" onClick={cities.onFormClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default CityForm

