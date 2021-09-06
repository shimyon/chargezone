import React, { useState,useEffect }  from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,Alert
} from 'reactstrap';
import Select from 'react-select';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { getCurrentUser } from '../../../helpers/Utils'
import {adminRoot, addUserAPI,getUserRolesAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

import { useHistory } from "react-router-dom";

const AddUser = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  //user roles
  const [userRolesList,setUserRolesList] = useState([]);
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");

  const history = useHistory();

  useEffect(()=>{
    getUserRolesAPICall();
  },[])

   //API CALLS
   const getUserRolesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getUserRolesAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        let userRoles=[];
        if (responseData.status === 1) {
          responseData.data.map((item,index)=>{
           userRoles.push({label:item.name,value:item.id,key:index})
         })
         setUserRolesList(userRoles);
        }else{
          console.log(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const addUserAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addUserAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/pages/user',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          addUserAlert(responseData.msg);
          setButtonDisabled(false);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //Alert helper methods
  const addUserAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Form Validation Schema
  const UserDetailsValidationSchema = yup.object().shape({
    name:yup.string()
        .required("Name name is required"),
    email:yup.string()
        .email("Inavlid email format")
        .required("Email is required"),
    contact_number:yup.string()
        .matches(/\+?\d[\d -]{8,12}\d/,"Invalid contact number")
        .length(10,"Invalid contact number length")
        .required("Contact number is required"),
    username:yup.string()
        .required("Username is required"),
    password:yup.string()
        .required("Password is required"),
    confirm_password:yup.string()
        .equals([yup.ref('password')], "Passwords must match")
        .required("Password is required"),
  });

  const initialValues = {
    name:"",
    email:"",
    contact_number:"",
    username:"",
    password:"",
    confirm_password:"",
  };
  
  return (    
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add User</span>
            <a href="User" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> User List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={UserDetailsValidationSchema} 
        onSubmit={(values)=>{
          const params = {
            name:values.name,
            email:values.email,
            roles:[selectedOptions.label],
            contact_number:values.contact_number,
            username:values.username,
            password:values.password
          }
          addUserAPICall(params);
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
                                  placeholder="Full Name "
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
                                  Email
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Email"
                                  value={values.email}
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.email && touched.email ? "input-error":null}
                                />
                                {errors.email && touched.email &&(
                                  <span className="error">{errors.email}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Role
                                </Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name="form-field-name"
                                  value={selectedOptions}
                                  onChange={setSelectedOptions}
                                  options={userRolesList}                                  
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
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
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Username
                                </Label>
                                <Input
                                  type="text"
                                  name="username"
                                  placeholder="Username"
                                  value={values.username}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.username && touched.username ? "input-error":null}
                                />
                                 {errors.username && touched.username &&(
                                  <span className="error">{errors.username}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                  Password
                                </Label>
                                <Input
                                  type="password"
                                  placeholder="Password"
                                  name="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.password && touched.password ? "input-error":null}
                                />
                                {errors.password && touched.password &&(
                                  <span className="error">{errors.password}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                  Confirm Password
                                </Label>
                                <Input
                                  type="password"
                                  placeholder="Confirm Password"
                                  name="confirm_password"
                                  value={values.confirm_password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.confirm_password && touched.confirm_password ? "input-error":null}
                                />
                                {errors.confirm_password && touched.confirm_password &&(
                                  <span className="error">{errors.confirm_password}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx md="12" className="text-center">
                              <Button color="primary" className="default mr-2" onClick={handleSubmit} disabled={buttonDisabled}>
                                  <b>Add</b>
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

export default AddUser;