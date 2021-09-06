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
import {getCountryListAPI,getCountryByIdAPI,addCountryAPI,updateCountryAPI,deleteCountryAPI} from '../../../constants/defaultValues';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

const CountryMaster = ({ match }) => {
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
    //country list state
    const [countryList,setCountryList] = useState([]);
    const [countryId,setCountryId] = useState("");
    const [countryName,setCountryName] = useState("");         

    useEffect(()=>{
        getCountryListAPICall();
    },[pageCount,toggleChange])

  //API CALLS
  const getCountryListAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getCountryListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setListFlag(true);
            setLastPageCount(responseData.data.last_page);
            setCountryList(responseData.data.data);
        }else{
            setListFlag(false);
        }
        setIsLoading(false);
      }).catch(error=>{
          setListFlag(false);
        console.log(error);
      })
  }
  const getCountryByIdAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(getCountryByIdAPI,
    {country_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
        setCountryId(responseData.data.id);
        setCountryName(responseData.data.country_name);
    }else{
        countryAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const addCountryAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(addCountryAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
        countryAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
    }else{
        countryAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const updateCountryAPICall = async(params) => {
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(updateCountryAPI,
    params,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
        countryAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
    }else{
        countryAlert(responseData.status,responseData.msg);
    }
    }).catch(error=>{
    console.log(error);
    })
  }
  const deleteCountryAPICall = async(params) => {
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteCountryAPI,
    {country_master_id:params},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
    const responseData = response.data;
    if (responseData.status === 1) {
        countryAlert(responseData.status,responseData.msg);
        setToggleChange(!toggleChange);
    }else{
        countryAlert(responseData.status,responseData.msg);
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
  const countryAlert = (status,msg)=>{
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
  const toggleModal = (countryId) => {
      setCountryId(countryId);    
      setModalVisible(!modalVisible);
  }
  const toggleUpdateModal = (status,country) => {
      setButtonState(status);
      if (status == 0) {
          setCountryName("");
          setModalUpdateVisible(!modalUpdateVisible);   
      } else {
          getCountryByIdAPICall(country);
          setModalUpdateVisible(!modalUpdateVisible);
      }
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getCountryListAPICall();
  }
  //Form Validation Schema
  const CountryDetailsValidationSchema = yup.object().shape({
    country_name:yup.string()
        .required("Country is required"),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Country</span>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="3"><div className="custom-list-loading" /></td>
                  </tr> : 
                    listFlag?
                        countryList.map((item,index)=>
                          <tr key={index}>
                            <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                            <td>{item.country_name}</td>
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
                            <td className="text-center text-danger" colSpan="7">Data  Not  Found</td>
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
              <Button color="success" className="mt-4" onClick={()=>deleteCountryAPICall(countryId)}>
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
                    country_name:countryName,
                }}
                validationSchema={CountryDetailsValidationSchema} 
                onSubmit={(values)=>{
                    if (buttonState==0) {
                        addCountryAPICall(values);
                    } else {
                        const params={country_master_id:countryId,country_name:values.country_name};
                        updateCountryAPICall(params);
                    }
                }} >
                {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
                    <>
                    <ModalHeader>
                        {buttonState==0?"Add Country":"Update Country"}
                    </ModalHeader>  
                    <ModalBody>
                        <Row>
                            <Colxx md="12">
                                <FormGroup>
                                    <Label>
                                     Country
                                    </Label>
                                    <Input
                                    type="text"
                                    placeholder="Country"
                                    name="country_name"
                                    value={values.country_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {errors.country_name && touched.country_name &&(
                                        <span className="error">{errors.country_name}</span>
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
export default CountryMaster;