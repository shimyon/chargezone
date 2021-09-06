import React,{useState,useEffect} from 'react';
import { 
  Row, FormGroup, Card, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {addEvAPI,adminRoot,getFleetOperatorAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';


const AddEV = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [fleetOpNames,setFleetOpNames] = useState([]); 

  useEffect(()=>{
      GetFleetOperatorAPICall();
  },[]);

  const history = useHistory();

  const GetFleetOperatorAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getFleetOperatorAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
        if (responseData.status === 1) {
         setFleetOpNames(responseData.data);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  //API calls
  const addEvAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addEvAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/pages/ev',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          evAddedAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const evAddedAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Form Validation Schema
  const EvDetailsValidationSchema = yup.object().shape({
    vehicle_model:yup.string()
        .required("Vehicle Model is required"),
    vehicle_make:yup.string()
        .required("Vehicle Make is required"),
    vehicle_type:yup.string()
        .required("Vehicle Type is required"),
    battery_capacity:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("Battery Capacity is required"),
    fleet_owner_id:yup.string()
        .required("Fleet Owner is required"),
  });

  const initialValues = {
    vehicle_model:"",
    vehicle_make:"",
    vehicle_type:"",
    battery_capacity:"",
    fleet_owner_id:"",
    ev_driver:"",
    remark_1:"",
    remark_2:""
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add EV</span>
            <a href="ev" className="btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> EV List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={EvDetailsValidationSchema} 
        onSubmit={(values)=>{
          const tempAllData = {ev_driver:values.ev_driver}
          const params = {
            vehicle_model:values.vehicle_model,
            vehicle_make:values.vehicle_make,
            vehicle_type:values.vehicle_type,
            battery_capacity:values.battery_capacity,
            fleet_owner_id:values.fleet_owner_id,
            all_data:JSON.stringify(tempAllData),
            remark_1:values.remark_1,
            remark_2:values.remark_2
          }
          addEvAPICall(params);
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
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                  Vehicle Model
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Vehicle Model"
                                  name="vehicle_model"
                                  value={values.vehicle_model}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.vehicle_model && touched.vehicle_model ? "input-error":null}
                                />
                                {errors.vehicle_model && touched.vehicle_model &&(
                                  <span className="error">{errors.vehicle_model}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                  Vehicle Make
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Vehicle Make"
                                  value={values.vehicle_make}
                                  name="vehicle_make"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.vehicle_make && touched.vehicle_make ? "input-error":null}
                                />
                                {errors.vehicle_make && touched.vehicle_make &&(
                                  <span className="error">{errors.vehicle_make}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                Vehicle Type
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Vehicle Type"
                                  name="vehicle_type"
                                  value={values.vehicle_type}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.vehicle_type && touched.vehicle_type ? "input-error":null}
                                />
                                {errors.vehicle_type && touched.vehicle_type &&(
                                  <span className="error">{errors.vehicle_type}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                Battery Capacity
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="Battery Capacity"
                                  name="battery_capacity"
                                  value={values.battery_capacity}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.battery_capacity && touched.battery_capacity ? "input-error":null}
                                />
                                {errors.battery_capacity && touched.battery_capacity &&(
                                  <span className="error">{errors.battery_capacity}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                  Fleet Owner
                                </Label>
                                <Input 
                                  type="select"
                                  name="fleet_owner_id"
                                  value={values.fleet_owner_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option key="" value="">All Fleet</option>
                                  {fleetOpNames.map(item=>
                                    <option key={item.fleet_operator_id} value={item.fleet_operator_id}>{item.name}</option>
                                  )}
                                </Input>
                                {errors.fleet_owner_id && touched.fleet_owner_id &&(
                                  <span className="error">{errors.fleet_owner_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={4}>
                              <FormGroup>
                                <Label>
                                  EV Driver
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="EV Driver"
                                  name="ev_driver"
                                  value={values.ev_driver}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.ev_driver && touched.ev_driver ? "input-error":null}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Remark 1
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_1"
                                  placeholder="Remark 1"
                                  value={values.remark_1}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Remark 2
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_2"
                                  placeholder="Remark 2"
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

export default AddEV;
