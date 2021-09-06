import React, { useEffect, useState } from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import Select from 'react-select';
import { getCurrentUser } from '../../../helpers/Utils'
import {updateOemAPI,getOemUsersAPI,getOemByIdAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';


const UpdateOEM = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //multiselect state
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [oemUsers, setOemUsers] = useState([]);
  //type state
  const [type, setType] = useState("");
  //oem details state
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");
  const [contactPerson,setContactPerson] = useState([]);
  const [contactEmail,setContactEmail] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");
   
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getOemUsersAPICall();
    getOemByIdAPICall();
  },[])

  //API calls
  const getOemUsersAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getOemUsersAPI,
      {user_role:"OEM"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        let users=[];
        if (responseData.status === 1) {
          responseData.data.map((item,index)=>{
           users.push({label:item.name,value:item.id,key:index})
         })
         setOemUsers(users);
        }else{
          oemUpdatedAlert(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
    }
    const getOemByIdAPICall = async() => {
        const currentUser = getCurrentUser();
        await axios.post(getOemByIdAPI,
        {
            oem_id:location.state.oem_id
        },
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            let tempData = [];
            if (responseData.status === 1) {
            setName(responseData.data.name);
            setAddress(responseData.data.address);
            setContactPerson(responseData.data.contact_person);
            setContactEmail(responseData.data.contact_email);
            setContactNumber(responseData.data.contact_number);
            setType(responseData.data.type);
            setRemark1(responseData.data.remark_1);
            setRemark2(responseData.data.remark_2);
            responseData.data.users.map((item,index)=>{
                tempData.push({label:item.name,value:item.id,key:index})
            })
            setSelectedOptions(tempData);
            }else{
              oemUpdatedAlert(responseData.msg);
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    const updateOemAPICall = async(params) => {
        setButtonDisabled(true);
        const currentUser = getCurrentUser();
        await axios.post(updateOemAPI,
        params,
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            if (responseData.status === 1) {
              history.push({
                pathname:adminRoot+'/pages/oem',
                state:{
                  responseStatus:responseData.status,
                  responseMsg:responseData.msg
                }
              })
            }else{
              setButtonDisabled(false);
              oemUpdatedAlert(responseData.msg);
            }
        }).catch(error=>{
            setButtonDisabled(false);
            console.log(error);
        })
    }

  //helper methods
  //Alert helper methods
  const oemUpdatedAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Form Validation Schema
  const OemDetailsValidationSchema = yup.object().shape({
    name:yup.string()
        .required("Name is required"),
    address:yup.string()
        .required("Address is required"),
    contact_person:yup.string()
        .required("Contact Person is required"),
    contact_email:yup.string()
        .email("Invalid Email format")
        .required("Contact email is required"),
    contact_number:yup.string()
        .matches(/\+?\d[\d -]{8,12}\d/,"Invalid contact number")
        .length(10,"Invalid contact number length")
        .required("Contact number is required"),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Update OEM</span>
            <a href="oem" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> OEM List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={{
            name:name,
            address:address,
            contact_person:contactPerson,
            contact_email:contactEmail,
            contact_number:contactNumber,
            remark_1:remark1,
            remark_2:remark2
        }}
        validationSchema={OemDetailsValidationSchema} 
        onSubmit={(values)=>{
          const usersSelected = [];
          selectedOptions.map(item=>{
            usersSelected.push(item.value)
          })
          const params = {
            oem_id:location.state.oem_id,
            name:values.name,
            address:values.address,
            contact_person:values.contact_person,
            contact_email:values.contact_email,
            contact_number:values.contact_number,
            users:usersSelected,
            type:type,
            remark_1:values.remark_1,
            remark_2:values.remark_2
          }
          updateOemAPICall(params);
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
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label>
                                  Address
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Address"
                                  name="address"
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
                            <Colxx sm={4}>
                              <FormGroup>
                                <Label>
                                  Contact Person
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Person"
                                  name="contact_person"
                                  value={values.contact_person}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_person && touched.contact_person ? "input-error":null}
                                />
                                {errors.contact_person && touched.contact_person &&(
                                  <span className="error">{errors.contact_person}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup>
                                <Label>
                                  Contact Email
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Email"
                                  name="contact_email"
                                  value={values.contact_email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_email && touched.contact_email ? "input-error":null}
                                />
                                {errors.contact_email && touched.contact_email &&(
                                  <span className="error">{errors.contact_email}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={4}>
                              <FormGroup>
                                <Label>
                                  Contact Number
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Number"
                                  name="contact_number"
                                  value={values.contact_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_number && touched.contact_number ? "input-error":null}
                                />
                                {errors.contact_number && touched.contact_number &&(
                                  <span className="error">{errors.contact_number}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label>
                                  Users
                                </Label>
                                  <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isMulti
                                    name="form-field-name"
                                    value={selectedOptions}
                                    onChange={setSelectedOptions}
                                    options={oemUsers}
                                  />
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label>
                                  Battery
                                </Label>
                                <Input type="select" onChange={(e)=>setType(e.target.value)} value={type}>
                                    <option key={0} >Select</option>
                                    <option key={1} value={1}>Battery</option>
                                    <option key={2} value={2}>EV</option>
                                    <option key={3} value={3}>Charger</option>
                                </Input>
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

export default UpdateOEM;
