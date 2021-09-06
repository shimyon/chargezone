import React,{useEffect, useState} from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,
  Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {updateSwappingStationAPI,getStationByIdAPI,getCountriesAPI,getStatesByCountryAPI,getCitiesByStateAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const UpdateSwappingStation = () => {
  const history = useHistory();
  const location = useLocation();
  //states
  const [stationName,setStationName] = useState("");
  const [evCapacity,setEvCapacity] = useState("");
  const [longitude,setLongitude] = useState("");
  const [latitude,setLatitude] = useState("");
  const [stationAddress,setStationAddress] = useState("");
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  // list state
  const [countryList,setCountryList] = useState([]);
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityId,setCityId] = useState("");

  useEffect(()=>{
      getStationByIdAPICall();
      getCountryNamesAPICall();
  },[])

  //API calls
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
  const getStationByIdAPICall = async() => {
      const currentUser = getCurrentUser();
      await axios.post(getStationByIdAPI,
      {
          hub_master_id:location.state.station_id
      },
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
          const responseData = response.data;
          if (responseData.status === 1) {
          getStateNamesAPICall(responseData.data.country_id);
          getCityNamesAPICall(responseData.data.state_id);
          setStationName(responseData.data.name);
          setStationAddress(responseData.data.address);
          setEvCapacity(responseData.data.ev_capacity);
          setLongitude(responseData.data.longitude);
          setLatitude(responseData.data.latitude);
          setRemark1(responseData.data.remark_1);
          setRemark2(responseData.data.remark_2);
          setCountryId(responseData.data.country_id);
          setStateId(responseData.data.state_id);
          setCityId(responseData.data.city_id);
          }else{
            stationUpdatedAlert(responseData.msg);
          }
      }).catch(error=>{
          console.log(error);
      })
  }

  const updateSwappingStationAPICall = async(params) => {
      setButtonDisabled(true);
      const currentUser = getCurrentUser();
      await axios.post(updateSwappingStationAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
          const responseData = response.data;
          if (responseData.status === 1) {
            history.push({
              pathname:adminRoot+'/pages/swapping_station',
              state:{
                responseStatus:responseData.status,
                responseMsg:responseData.msg
              }
            })
          }else{
            setButtonDisabled(false);
            stationUpdatedAlert(responseData.msg);
          }
      }).catch(error=>{
          setButtonDisabled(false);
          console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const stationUpdatedAlert = (msg)=>{
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
    console.log(state);
    getCityNamesAPICall(state);
  }
  //handle city select
  const handleCitySelect = (city) => {
    setCityId(city);
  }
  //Form Validation Schema
  const StationDetailsValidationSchema = yup.object().shape({
    name:yup.string()
        .required("Station name is required"),
    ev_capacity:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("EV capacity is required"),
    address:yup.string()
        .nullable()
        .required("Address is required")
  });

  

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Update Swapping Station</span>
            <a href="swapping_station" className="btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Swapping Station List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        enableReinitialize={true} 
        initialValues={{
          name:stationName,
          ev_capacity:evCapacity,
          latitude:latitude,
          longitude:longitude,
          address:stationAddress,
          remark_1:remark1,
          remark_2:remark2
        }}
        validationSchema={StationDetailsValidationSchema} 
        onSubmit={(values)=>{
          const params = {
            hub_master_id: location.state.station_id,
            name:values.name,
            address:values.address,
            ev_capacity:values.ev_capacity,
            remark_1:values.remark_1,
            remark_2:values.remark_2,
            latitude:values.latitude,
            longitude:values.longitude,
            country_id:countryId,
            state_id:stateId,
            city_id:cityId
          }
          updateSwappingStationAPICall(params);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <Card className="mb-4">
                      <CardBody> 
                          <Row>
                          <Colxx md="12">
                              <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                                {alertMsg}
                              </Alert>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Name
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.name && touched.name ? "input-error":null}
                                />
                                {errors.name && touched.name &&(
                                  <span className="error">{errors.name}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                EV Capacity
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="EV Capacity"
                                  value={values.ev_capacity}
                                  name="ev_capacity"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.ev_capacity && touched.ev_capacity ? "input-error":null}
                                />
                                {errors.ev_capacity && touched.ev_capacity &&(
                                  <span className="error">{errors.ev_capacity}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md="4">
                              <FormGroup>
                                <Label>
                                  Country
                                </Label>
                                <Input
                                type="select"
                                name="country_id"
                                value={countryId}
                                onChange={e=>handleCountrySelect(e.target.value)}
                                onBlur={handleBlur}
                                >
                                  <option key={0}>Select Country</option>
                                  {countryList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.country_name}</option>
                                  )}
                                </Input>
                                {errors.country_id && touched.country_id &&(
                                    <span className="error">{errors.country_id}</span>
                                )}
                              </FormGroup>    
                            </Colxx>
                            <Colxx md="4">
                              <FormGroup>
                                <Label>
                                  State
                                </Label>
                                <Input
                                type="select"
                                name="state_id"
                                value={stateId}
                                onChange={e=>handleStateSelect(e.target.value)}
                                onBlur={handleBlur}
                                >
                                  <option key={0}>Select State</option>
                                  {stateList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.state_name}</option>
                                  )}
                                </Input>
                                {errors.country_id && touched.country_id &&(
                                    <span className="error">{errors.country_id}</span>
                                )}
                              </FormGroup>    
                            </Colxx>
                            <Colxx md="4">
                              <FormGroup>
                                <Label>
                                  City
                                </Label>
                                <Input
                                type="select"
                                name="city_id"
                                value={cityId}
                                onChange={e=>handleCitySelect(e.target.value)}
                                onBlur={handleBlur}
                                >
                                  <option key={0}>Select City</option>
                                  {cityList.map((item,index)=>
                                    <option key={index} value={item.id}>{item.city_name}</option>
                                  )}
                                </Input>
                                {errors.country_id && touched.country_id &&(
                                    <span className="error">{errors.country_id}</span>
                                )}
                              </FormGroup>    
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Longitude
                                </Label>
                                <Input
                                  type="number"
                                  name="longitude"
                                  placeholder="Longitude"
                                  value={values.longitude}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Latitude
                                </Label>
                                <Input
                                  type="number"
                                  name="latitude"
                                  placeholder="Latitude"
                                  value={values.latitude}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Address
                                </Label>
                                <Input
                                  type="text"
                                  name="address"
                                  placeholder="Address"
                                  value={values.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.address && touched.address ? "input-error":null}
                                />
                                {errors.address && touched.address &&(
                                  <span className="error">{errors.address}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Remark1
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_1"
                                  placeholder="Remark1"
                                  value={values.remark_1}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Remark2
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_2"
                                  placeholder="Remark2"
                                  value={values.remark_2}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx md="12" className="text-center">
                              <Button color="primary" className="default mr-2" onClick={handleSubmit} disabled={buttonDisabled}>
                                  <b>Update</b>
                              </Button>
                              <Button color="light" className="default" onClick={()=>{history.goBack()}}>
                                  <b>Cancel</b>
                              </Button>
                            </Colxx>
                          </Row>
                      </CardBody>
                      </Card>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>
    </>
  );
};

export default UpdateSwappingStation;
