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
import {getStateListAPI,getCountriesAPI,getStateByIdAPI,addStateAPI,updateStateAPI,deleteStateAPI} from '../../../constants/defaultValues';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';


const StateMaster = ({ match }) => {
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
  //default values state
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [stateName,setStateName] = useState("");

  useEffect(()=>{
    getStateListAPICall();
    getCountryNamesAPICall();
  },[pageCount,toggleChange])

  //API CALLS
  const getStateListAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getStateListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setListFlag(true);
            setLastPageCount(responseData.data.last_page);
            setStateList(responseData.data.data);
        }else{
            setListFlag(false);
        }
        setIsLoading(false);
      }).catch(error=>{
          setListFlag(false);
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
          stateAlert(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getStateByIdAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(getStateByIdAPI,
    {state_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
        setCountryId(responseData.data.country_id);
        setStateId(responseData.data.id);
        setStateName(responseData.data.state_name);
    }else{
        stateAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const addStateAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(addStateAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      stateAlert(responseData.status,responseData.msg);
    }else{
      stateAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const updateStateAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(updateStateAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      stateAlert(responseData.status,responseData.msg);
    }else{
      stateAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const deleteStateAPICall = async(params) => {
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteStateAPI,
    {state_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
      setToggleChange(!toggleChange);
      stateAlert(responseData.status,responseData.msg);
    }else{
      stateAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
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
  const stateAlert = (status,msg)=>{
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
const toggleModal = (state) => {
  setStateId(state);    
  setModalVisible(!modalVisible);
}
const toggleUpdateModal = (status,state) => {
  setButtonState(status);
  if (status == 0) {
      setCountryId("");
      setStateName("");
      setModalUpdateVisible(!modalUpdateVisible);   
  } else {
      getStateByIdAPICall(state);
      setModalUpdateVisible(!modalUpdateVisible);
  }
}
//handle search input
const handleSearch = () => {
  setPageCount(1);
  getStateListAPICall();
}
  //Form Validation Schema
  const StateDetailsValidationSchema = yup.object().shape({
    country_id:yup.string()
        .required("Country is required"),
    state_name:yup.string()
        .required("State is required"),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">State</span>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="4"><div className="custom-list-loading" /></td>
                  </tr> : 
                    listFlag?
                        stateList.map((item,index)=>
                          <tr key={index}>
                            <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                            <td>{item.country_name}</td>
                            <td>{item.state_name}</td>
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
                            <td className="text-center text-danger" colSpan="4">Data  Not  Found</td>
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
              <Button color="success" className="mt-4" onClick={()=>deleteStateAPICall(stateId)}>
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
                country_id:countryId,
                state_name:stateName,
              }}
              validationSchema={StateDetailsValidationSchema} 
              onSubmit={(values)=>{
                if (buttonState==0) {
                  addStateAPICall(values);
                } else {
                  const params={state_master_id:stateId,country_id:values.country_id,state_name:values.state_name};
                  updateStateAPICall(params);
                }
              }} >
              {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
                  <>
                  <ModalHeader>
                  {buttonState==0?"Add State":"Update State"}
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
                            value={values.country_id}
                            onChange={handleChange}
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
                              type="text"
                              placeholder="State"
                              name="state_name"
                              value={values.state_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              />
                              {errors.state_name && touched.state_name &&(
                                  <span className="error">{errors.state_name}</span>
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
export default StateMaster;
