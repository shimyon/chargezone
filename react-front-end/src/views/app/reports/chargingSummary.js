import React,{useState,useEffect} from 'react';
import {
  Row, Card, CardBody, FormGroup, Label,
  Input, Table,Button,Alert
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import Select from 'react-select';
import { getCurrentUser } from '../../../helpers/Utils'
import {getStationsAPI,getCountriesAPI,getStatesByCountryAPI,getCitiesByStateAPI,getFleetOperatorAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

const ChargingSummary = ({}) => {
  //date states
  const [fromDate,setFromDate] = useState();
  const [toDate,setToDate] = useState();
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //loader state
  const [isLoading,setIsLoading] = useState(true);
  // list state
  const [countryList,setCountryList] = useState([]);
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);
  const [stationNames,setStationNames] = useState([]);
  const [fleetOpNames,setFleetOpNames] = useState([]);
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityId,setCityId] = useState("");
  //multiselect state
  const [fleetSelectedOptions, setFleetSelectedOptions] = useState([]);
  const [stationSelectedOptions, setStationSelectedOptions] = useState([]);

  useEffect(()=>{
    getCountryNamesAPICall();
    GetStationNamesAPICall();
    GetFleetOperatorAPICall();
  },[])

  //API calls
  const GetStationNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getStationsAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      let stations=[];
        if (responseData.status === 1) {
          responseData.data.map((item,index)=>{
           stations.push({label:item.name,value:item.hub_master_id,key:index})
         })
         setStationNames(stations);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const GetFleetOperatorAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getFleetOperatorAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      let fleet=[];
        if (responseData.status === 1) {
          responseData.data.map((item,index)=>{
           fleet.push({label:item.name,value:item.fleet_operator_id,key:index})
         })
         setFleetOpNames(fleet);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const getCountryNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getCountriesAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setCountryList(responseData.data);
        }else{
            console.log(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getStateNamesAPICall = async(country) => {
    const currentUser = getCurrentUser();
    await axios.post(getStatesByCountryAPI,
      {country_id:country},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setStateList(responseData.data);
        }else{
          console.log(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getCityNamesAPICall = async(state) => {
    const currentUser = getCurrentUser();
    await axios.post(getCitiesByStateAPI,
      {state_id:state},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setCityList(responseData.data);
        }else{
          console.log(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const chargingSummaryAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //handle country select
  const handleCountrySelect = (country) => {
    setCountryId(country);
    getStateNamesAPICall(country);
  }
  //handle state select
  const handleStateSelect = (state) => {
    setStateId(state);
    getCityNamesAPICall(state);
  }
  //handle city select
  const handleCitySelect = (city) => {
    setCityId(city);
  }
  //Form Validation Schema
  const ChargingSummaryDetailsValidationSchema = yup.object().shape({
    charger_id:yup.string()
        .required("Charger is required"),
    connector_id:yup.string()
        .required("Connector is required"),
  });

  const initialValues = {
    charger_id:"",
    connector_id:"",
  };
  

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Charging Summary</span>
        <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={ChargingSummaryDetailsValidationSchema} 
        onSubmit={(values)=>{
            const fleetSelected = [];
            fleetSelectedOptions.map(item=>{
                fleetSelected.push(item.value)
            })
            const stationSelected = [];
            stationSelectedOptions.map(item=>{
                stationSelected.push(item.value)
            })
          const params = {
            country_id:countryId,
            state_id:stateId,
            city_id:cityId,
            fleet_operator_id:fleetSelected,
            hub_id:stationSelectedOptions,
            charger_id:values.charger_id,
            connector_id:values.connector_id,
            from_date:fromDate,
            to_date:toDate
          }
          console.log(params);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                    <Card>
                        <CardBody>
                          <Row>
                          <Colxx md="6">
                            <h3>Select Option</h3>
                            </Colxx>
                            <Colxx md="6">
                            <Button color="primary" className="default mr-2 float-right" onClick={handleSubmit} >
                              <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Generate Report</b>
                            </Button>
                            </Colxx>
                          </Row>
                          <hr/>
                          <Row>
                            <Colxx md="12">
                              <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                                {alertMsg}
                              </Alert>
                            </Colxx>
                          <Colxx lg={4} sm={12}>
                              <FormGroup>
                                <Label>
                                  Country
                                </Label>
                                <Input 
                                type="select"
                                name="country_id"
                                value={countryId}
                                onChange={e=>handleCountrySelect(e.target.value)}
                                >
                                  <option>Select Country</option>
                                  {countryList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.country_name}</option>
                                  )}
                                </Input>
                                {/* {errors.country_id && touched.country_id &&(
                                  <span className="error">{errors.country_id}</span>
                                )} */}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={4} sm={12}>
                              <FormGroup>
                                <Label>
                                  State
                                </Label>
                                <Input 
                                type="select"
                                name="state_id"
                                value={stateId}
                                onChange={e=>handleStateSelect(e.target.value)}
                                >
                                  <option>Select State</option>
                                  {stateList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.state_name}</option>
                                  )}
                                </Input>
                                {/* {errors.state && touched.state &&(
                                  <span className="error">{errors.state}</span>
                                )} */}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={4} sm={12}>
                              <FormGroup>
                                <Label>
                                  City
                                </Label>
                                <Input 
                                type="select"
                                name="city_id"
                                value={cityId}
                                onChange={e=>handleCitySelect(e.target.value)}
                                >
                                  <option>Select City</option>
                                  {cityList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.city_name}</option>
                                  )}
                                </Input>
                                {/* {errors.city && touched.city &&(
                                  <span className="error">{errors.city}</span>
                                )} */}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={6} sm={12}>
                                <FormGroup>
                                    <Label>
                                    Fleet Operator
                                    </Label>
                                    <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isMulti
                                    name="form-field-name"
                                    value={fleetSelectedOptions}
                                    onChange={setFleetSelectedOptions}
                                    options={fleetOpNames}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx lg={6} sm={12}>
                                <FormGroup>
                                    <Label>
                                    Station
                                    </Label>
                                    <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isMulti
                                    name="form-field-name"
                                    value={stationSelectedOptions}
                                    onChange={setStationSelectedOptions}
                                    options={stationNames}
                                    />
                                </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  Charger
                                </Label>
                                <Input 
                                type="text"
                                placeholder="Charger Id"
                                name="charger_id"
                                value={values.charger_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                </Input>
                                {errors.charger_id && touched.charger_id &&(
                                  <span className="error">{errors.charger_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  Connector
                                </Label>
                                <Input 
                                type="text"
                                placeholder="Connector Id"
                                name="connector_id"
                                value={values.connector_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                </Input>
                                {errors.connector_id && touched.connector_id &&(
                                  <span className="error">{errors.connector_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  From Date
                                </Label>
                                <DatePicker
                                placeholderText="From Date"
                                selected={fromDate}
                                onChange={date=>setFromDate(date)}
                                dateFormat="dd/MM/yyyy"
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  To Date
                                </Label>
                                <DatePicker
                                placeholderText="To Date"
                                selected={toDate}
                                onChange={date=>setToDate(date)}
                                dateFormat="dd/MM/yyyy"
                                />
                              </FormGroup>
                            </Colxx>
                          </Row>
                        </CardBody>
                    </Card>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>
      <Row>
          <Colxx sm={12} lg={12}>
            <Card>
              <CardBody>
                <h3>Charging Summary</h3>
                <Table responsive bordered striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Charger Id</th>
                      <th>Connector ID</th>
                      <th>BIN</th>
                      <th>Start SoC</th>
                      <th>Start Battery Voltage</th>
                      <th>Start Whr</th>		
                      <th>Start Time</th>
                      <th>Stop SoC</th>
                      <th>Stop Battery Voltage</th>
                      <th>Stop Whr</th>
                      <th>Stop Time</th>
                      <th>Charging Duration</th>
                      <th>Check cell balancing happened</th>
                      <th>Energy exchanged (DC)</th>
                      <th>Unit/SoC</th>
                      <th>Session ID</th>
                      <th>Energy Meter Reading</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="7"><div className="custom-list-loading" /></td>
                      </tr> : 
                      userList.length > 0 ?
                          userList.map((item,index)=>
                            <tr key={item.id}>
                              <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index+1}</th>
                              <td>{item.username}</td>
                              <td>{item.name}</td>
                              <td>{item.contact_number}</td>
                              <td>{item.email}</td>
                              <td>{item.role_name}</td>
                            </tr>
                          ):<tr>
                          <td className="text-center text-danger" colSpan="7">Data  Not  Found</td>
                      </tr>
                  } */}
                    <tr>
                      <th scope="row">1</th>
                      <td>Country 1</td>
                      <td>State 1</td>
                      <td>City 1</td>
                      <td>Station 1</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                      <td>12</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
      </Row>
    </>
  );
};

export default ChargingSummary;
