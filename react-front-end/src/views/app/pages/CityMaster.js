import React, { useEffect, useState } from 'react';
import { 
  Row, FormGroup,Label,
  Card, CardBody,CardSubtitle,
  Modal, ModalHeader, ModalBody, ModalFooter, 
  Table, Button, 
  DropdownItem,DropdownMenu,DropdownToggle,Alert,UncontrolledDropdown,
  Input,InputGroup
} from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getCountriesAPI,getStatesByCountryAPI,getCityListAPI,getCityByIdAPI,addCityAPI,updateCityAPI,deleteCityAPI} from '../../../constants/defaultValues';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';


const CityMaster = ({ match }) => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //flag to check whether data in list or not
  const [listFlag,setListFlag] = useState(false);
  //toggle to re-render page on add,updates,delete
  const [toggleChange,setToggleChange] = useState(false);
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  const [modalUpdateVisible,setModalUpdateVisible] = useState(false);
  //button state ... state 0 for add and 1 for update
  const [buttonState,setButtonState] = useState();
  //loader states
  const [isLoading,setIsLoading] = useState(true);
  // list state
  const [countryList,setCountryList] = useState([]);
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);
  //default values state
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityName,setCityName] = useState("");
  const [cityId,setCityId] = useState("");


  useEffect(()=>{
    getCityListAPICall();
    getCountryNamesAPICall();
  },[pageCount,toggleChange])

  //API CALLS
  const getCityListAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getCityListAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setListFlag(true);
          setLastPageCount(responseData.data.last_page);
          setCityList(responseData.data.data);
        }else{
          setListFlag(false)
        }
        setIsLoading(false);
      }).catch(error=>{
        setListFlag(false)
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
            cityAlert(responseData.status,responseData.msg);
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
            cityAlert(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getCityByIdAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(getCityByIdAPI,
    {city_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      console.log(responseData.data);
      getStateNamesAPICall(responseData.data.country_id);
      setStateId(responseData.data.state_id);
      setCountryId(responseData.data.country_id);
      setCityName(responseData.data.city_name);
      setCityId(responseData.data.id);
    }else{
        cityAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const addCityAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(addCityAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      cityAlert(responseData.status,responseData.msg);
    }else{
      setToggleChange(!toggleChange);
      cityAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const updateCityAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(updateCityAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      cityAlert(responseData.status,responseData.msg);
    }else{
      cityAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const deleteCityAPICall = async(params) => {
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteCityAPI,
    {city_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      cityAlert(responseData.status,responseData.msg);
    }else{
      setToggleChange(!toggleChange);
      cityAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }

  //helper methods
  //pagination method
  const renderPageList = () => {
    const pageNumbers = [];
    for (let i = 0; i <lastPageCount; i += 1) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={() => {setPageCount(i+1)}}>
          {i+1}
        </DropdownItem>
      );
    }
    return pageNumbers;
  };
  //Alert helper methods
  const cityAlert = (status,msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    if (status === 1) {
      setAlertColor("success");
    } else {
      setAlertColor("danger");
    }              
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Modal helper methods
  const toggleModal = (city) => {
    setCityId(city);    
    setModalVisible(!modalVisible);
  }
  const toggleUpdateModal = (status,city) => {
    setButtonState(status);
    if (status == 0) {
        setCountryId("");
        setStateId("");
        setCityName("");
        setStateList([]);
        setModalUpdateVisible(!modalUpdateVisible);   
    } else {
      getCityByIdAPICall(city);
      setModalUpdateVisible(!modalUpdateVisible);
    }
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
    //   getChargerMappingAPICall();
  }
  //handle Country Select
  const handleCountrySelect = (country) => {
    setCountryId(country);
    getStateNamesAPICall(country)
  }
  //Form Validation Schema
  const CityDetailsValidationSchema = yup.object().shape({
    state_id:yup.string()
        .required("State is required"),
    city_name:yup.string()
        .required("City is required"),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">City</span>
            <Button color="primary" className="mt-2 default btn-sm float-right" onClick={()=>toggleUpdateModal(0)}>
                <b><i className="glyph-icon simple-icon-plus"></i> Add New</b>
            </Button>
            <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Row>
        <Colxx md="4">
          <div className="ml-2 mb-2">
            <InputGroup>
            <Input 
            type="text" 
            placeholder="Search"
            value={searchBy}
            onChange={e=>setSearchBy(e.target.value)}/>
            <Button className="default search-icon" color="primary" outline onClick={()=>handleSearch()}><i className="glyph-icon simple-icon-magnifier"></i></Button>
            </InputGroup>  
          </div>
        </Colxx>
        <Colxx md="8">
          <div className="text-right mr-5 mb-2">
              <span className="ml-5">Page </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs" data-display="static">
                  {pageCount}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                  {renderPageList()}
                </DropdownMenu>
              </UncontrolledDropdown>
              <span> of </span>
              {lastPageCount}              
            </div>
        </Colxx>
      </Row>
      <Row className="mb-5">
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardSubtitle className="mb-3">
                <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                  {alertMsg}
                </Alert>
              </CardSubtitle>
              <Table responsive bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="5"><div className="custom-list-loading" /></td>
                  </tr> : 
                    listFlag?
                        cityList.map((item,index)=>
                          <tr key={index}>
                            <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                            <td>{item.country_name}</td>
                            <td>{item.state_name}</td>
                            <td>{item.city_name}</td>
                            <td>
                              <Button color="info" className="default mr-1 btn-sm tbl_action_btn" onClick={()=>toggleUpdateModal(1,item.id)}>
                                  <i className="glyph-icon simple-icon-pencil"></i>
                              </Button>
                              <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.id)}}>
                                  <i className="glyph-icon simple-icon-trash"></i>
                              </Button>  
                            </td>
                          </tr>
                        ):<tr>
                            <td className="text-center text-danger" colSpan="5">Data  Not  Found</td>
                        </tr>
                           
                      }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Modal
        isOpen={modalVisible}
        toggle={toggleModal} >
        <ModalHeader className="text-center">
          <Row>
            <Colxx md="12">
              Are you sure you would like to delete this ?
            </Colxx>
            <Colxx md="12">
              <Button color="success" className="mt-4" onClick={()=>deleteCityAPICall(cityId)}>
                Delete 
              </Button>{' '}
              <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                Cancel
              </Button>
            </Colxx>
          </Row>
        </ModalHeader>
      </Modal>
      <Modal
        isOpen={modalUpdateVisible}
        toggle={toggleUpdateModal} >
          <Formik
              enableReinitialize={true}
              initialValues={{
                state_id:stateId,
                city_name:cityName,
              }}
              validationSchema={CityDetailsValidationSchema} 
              onSubmit={(values)=>{
              console.log(values);
              if (buttonState==0) {
                addCityAPICall(values);
              } else {
                const params={city_master_id:cityId,state_id:values.state_id,city_name:values.city_name};
                updateCityAPICall(params);
              }
              }} >
              {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
                  <>
                  <ModalHeader>
                  {buttonState==0?"Add City":"Update City"}
                  </ModalHeader>  
                  <ModalBody>
                    <Row>
                        <Colxx md="12">
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
                        <Colxx md="12">
                          <FormGroup>
                            <Label>
                              State
                            </Label>
                            <Input
                            type="select"
                            name="state_id"
                            value={values.state_id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            >
                              <option key={0}>Select State</option>
                              {stateList.map((item,index)=>
                                <option key={index} value={item.id}>{item.state_name}</option>
                              )}
                            </Input>
                            {errors.state_id && touched.state_id &&(
                                <span className="error">{errors.state_id}</span>
                            )}
                          </FormGroup>    
                        </Colxx>
                        <Colxx md="12">
                          <FormGroup>
                            <Label>
                              City
                            </Label>
                            <Input
                            type="text"
                            placeholder="City"
                            name="city_name"
                            value={values.city_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {errors.city_name && touched.city_name &&(
                                <span className="error">{errors.city_name}</span>
                            )}
                        </FormGroup>    
                      </Colxx>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                  <Button color="success" className="mt-4" onClick={handleSubmit}>
                  {buttonState==0?"Add":"Update"}
                      </Button>{' '}
                      <Button color="danger" className="mt-4 mr-2" onClick={()=>toggleUpdateModal(0)}>
                      Cancel
                      </Button>
                  </ModalFooter>
                  </>
              )}
          </Formik>
      </Modal>
    </>
  );
};
export default CityMaster;
