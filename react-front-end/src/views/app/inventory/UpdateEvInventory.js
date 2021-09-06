import React,{useState,useEffect} from 'react';
import { 
  Row, FormGroup, Card, CardBody,CardSubtitle,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getStationsAPI,getEvAPI,getEvInventoryByIdAPI,updateEvInventoryAPI,adminRoot,getFleetOperatorAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const UpdateEvInventory = () => {
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //dropdown states
  const [fleetOpNames,setFleetOpNames] = useState([]); 
  const [stationNameData,setStationNameData] = useState([]);
  const [evData,setEvData] = useState([]);
  //EV data default states
  const [eQrCode,setEQrCode] = useState("");
  const [fleetOwner,setFleetOwner] = useState("");
  const [hubId,setHubId] = useState("");
  const [evMasterId,setEvMasterId] = useState("");
  const [registrationNo,setRegistrationNo] = useState("");
  const [vechicleId,setVechicleId] = useState("");
  const [vechicleVin,setVechicleVin] = useState("");
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    GetFleetOperatorAPICall();
    GetStationNamesAPICall();
    GetEvDataAPICall();
    getEvInventoryByIdAPICall();
  },[])

  //API calls
  const GetStationNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getStationsAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setStationNameData(responseData.data)
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
        if (responseData.status === 1) {
         setFleetOpNames(responseData.data);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const GetEvDataAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getEvAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setEvData(responseData.data);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const getEvInventoryByIdAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getEvInventoryByIdAPI,
    {
        ev_inventory_id:location.state.ev_inventory_id
    },
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
        setEQrCode(responseData.data.e_qr_code);
        setFleetOwner(responseData.data.fleet_owner_id);
        setHubId(responseData.data.hub_id);
        setEvMasterId(responseData.data.ev_master_id);
        setVechicleId(responseData.data.vechicle_id);
        setVechicleVin(responseData.data.vehicle_vin);
        setRegistrationNo(responseData.data.registration_no);
        setRemark1(responseData.data.remark_1);
        setRemark2(responseData.data.remark_2);
        }else{
        console.log(responseData.msg);
        }
    }).catch(error=>{
        console.log(error);
    })
}
  const updateEvInventoryAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(updateEvInventoryAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/inventory/evInventory',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
            setButtonDisabled(false);
            updateEvInventoryAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //Form Validation Schema
  const EvInventoryDetailsValidationSchema = yup.object().shape({
    e_qr_code:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("QR Code is required"),
    fleet_owner_id:yup.string()
        .required("Fleet Owner is required"),
    hub_id:yup.string()
        .required("Station is required"),
    ev_master_id:yup.string()
        .required("EV details is required"),
    registration_no:yup.string()
        .required("Registration No is required"),
    vechicle_id:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("Vehicle Id is required"),
    vehicle_vin:yup.string()
        .required("Vehicle Vin is required"),    
  });

  //helper
  //Alert helper methods
  const updateEvInventoryAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Update EV</span>
            <a href="evInventory" className="btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> EV List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={{
            e_qr_code:eQrCode,
            fleet_owner_id:fleetOwner,
            hub_id:hubId,
            ev_master_id:evMasterId,
            registration_no:registrationNo,
            vechicle_id:vechicleId,
            vehicle_vin:vechicleVin,
            remark_1:remark1,
            remark_2:remark2,
        }}
        validationSchema={EvInventoryDetailsValidationSchema} 
        onSubmit={(values)=>{
          const params={
                ev_inventory_id:location.state.ev_inventory_id,
                e_qr_code:values.e_qr_code,
                fleet_owner_id:values.fleet_owner_id,
                hub_id:values.hub_id,
                ev_master_id:values.ev_master_id,
                registration_no:values.registration_no,
                vechicle_id:values.vechicle_id,
                vehicle_vin:values.vehicle_vin,
                remark_1:values.remark_1,
                remark_2:values.remark_2,
            }
          updateEvInventoryAPICall(params);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <Card className="mb-4">
                      <CardBody>
                        <CardSubtitle className="mb-3">
                          <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                            {alertMsg}
                          </Alert>
                        </CardSubtitle> 
                        <Row>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                                QR Code
                              </Label>
                              <Input
                                type="text"
                                placeholder="QR Code"
                                name="e_qr_code"
                                value={values.e_qr_code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.e_qr_code && touched.e_qr_code ? "input-error":null}
                              />
                              {errors.e_qr_code && touched.e_qr_code &&(
                                <span className="error">{errors.e_qr_code}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={6}>
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
                              Vehicle Id
                              </Label>
                              <Input
                                type="text"
                                placeholder="Vehicle Id"
                                name="vechicle_id"
                                value={values.vechicle_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.vechicle_id && touched.vechicle_id &&(
                                <span className="error">{errors.vechicle_id}</span>
                              )}                        
                            </FormGroup>
                          </Colxx>
                          <Colxx md={4}>
                            <FormGroup>
                              <Label>
                              Vehicle Vin
                              </Label>
                              <Input
                                type="text"
                                placeholder="Vehicle Vin"
                                name="vehicle_vin"
                                value={values.vehicle_vin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.vehicle_vin && touched.vehicle_vin &&(
                                <span className="error">{errors.vehicle_vin}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={4}>
                            <FormGroup>
                              <Label>
                                Registration no
                              </Label>
                              <Input
                                type="text"
                                placeholder="Registration no"
                                name="registration_no"
                                value={values.registration_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.registration_no && touched.registration_no &&(
                                <span className="error">{errors.registration_no}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                              Swapping Station
                              </Label>
                              <Input
                                type="select"
                                name="hub_id"
                                value={values.hub_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>Select Swapping Station</option>
                                {stationNameData.map((item)=>
                                  <option value={item.hub_master_id} key={item.hub_master_id}>{item.name}</option>
                                )}
                              </Input>
                              {errors.hub_id && touched.hub_id &&(
                                <span className="error">{errors.hub_id}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                              EV
                              </Label>
                              <Input
                                type="select"
                                name="ev_master_id"
                                value={values.ev_master_id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option>Select EV details</option>
                                {evData.map((item)=>
                                  <option value={item.ev_master_id} key={item.ev_master_id}>{item.vehicle_model+"-"+item.vehicle_type+"-"+item.battery_capacity}</option>
                                )}
                              </Input>
                              {errors.ev_master_id && touched.ev_master_id &&(
                                <span className="error">{errors.ev_master_id}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                              Remark 1
                              </Label>
                              <Input
                                type="text"
                                placeholder="Remark 1"
                                name="remark_1"
                                value={values.remark_1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.remark_1 && touched.remark_1 &&(
                                <span className="error">{errors.remark_1}</span>
                              )}
                            </FormGroup>
                          </Colxx>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                                Remark 2
                              </Label>
                              <Input
                                type="text"
                                placeholder="Remark 2"
                                name="remark_2"
                                value={values.remark_2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.remark_2 && touched.remark_2 &&(
                                <span className="error">{errors.remark_2}</span>
                              )}
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

export default UpdateEvInventory;
