import React,{useState} from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { getCurrentUser } from '../../../helpers/Utils'
import {adminRoot, addOwnerAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";


const AddOwner = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);

  const history = useHistory();

  //API calls
  const addOwnerAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addOwnerAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/pages/owner',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          ownerAddedAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const ownerAddedAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Form Validation Schema
  const OwnerDetailsValidationSchema = yup.object().shape({
    name:yup.string()
        .required("Owner name is required"),
    contact_email:yup.string()
        .email("Invalid Email format"),
    contact_number:yup.string()
        .matches(/\+?\d[\d -]{8,12}\d/,"Invalid contact number")
        .length(10,"Invalid contact number length")
  });

  const initialValues = {
    name:"",
    contact_email:"",
    contact_number:"",
    address:"",
    remark:"",
  };
  

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Owner</span>
            <a href="owner" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Owner List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={OwnerDetailsValidationSchema} 
        onSubmit={(values)=>{
          const tempAllData = {
            contact_email:values.contact_email,
            contact_number:values.contact_number,
            address:values.address,
          }
          const params = {
            name: values.name,
            all_data:JSON.stringify(tempAllData),
            remark:values.remark
          }
          addOwnerAPICall(params);
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
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Remark
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Remark "
                                  name="remark"
                                  value={values.remark}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
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

export default AddOwner;
