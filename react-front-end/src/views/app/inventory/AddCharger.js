import React,{useState,useEffect} from 'react';
import { 
  Row,FormGroup, Card,CardSubtitle, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getOwnersAPI,getChargerAPI,getStationsAPI,addChargerInventoryAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';

const AddCharger = () => {
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //dropdown states
  const [stationNameData,setStationNameData] = useState([]);
  const [ownerNameData,setOwnerNameData] = useState([]);
  const [chargerMasterData,setChargerMasterData] = useState([]);

  const history = useHistory();

  useEffect(()=>{
    GetStationNamesAPICall();
    GetOwnerNamesAPICall();
    GetChargerMasterAPICall();
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
  const GetOwnerNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getOwnersAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setOwnerNameData(responseData.data)
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const GetChargerMasterAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getChargerAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setChargerMasterData(responseData.data)
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const addChargerInventoryAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addChargerInventoryAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/inventory/charger',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          addChargerInventoryAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //Form Validation Schema
  const ChargerInventoryDetailsValidationSchema = yup.object().shape({
    charger_id:yup.string()
        .required("Charger ID is required"),
    hub_id:yup.string()
        .required("Station is required"),
    qr_code:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("QR Code capacity is required"),
    own_by:yup.string()
        .required("Owned By is required"),
    charger_master_id:yup.string()
        .required("Charger is required"),
    numberOfSlots: yup.string()
            .required('Number of slots is required'),
    slots: yup.array().of(
      yup.object().shape({
            // charger_id: yup.string()
            //     .required('Charger Id is required'),
            slot_id: yup.string()
                .required('Slot Id is required')
        })
    )
  });

  const initialValues = {
    charger_id:"",
    hub_id:"",
    qr_code:"",
    charger_master_id:"",
    own_by:"",
    remark_1:"",
    remark_2:"",
    numberOfSlots: '',
    slots: []
  };

  function onChangeSlots(e, field, values, setValues) {
    // update dynamic form
    const slots = [...values.slots];
    const numberOfSlots = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < numberOfSlots) {
        for (let i = previousNumber; i < numberOfSlots; i++) {
            slots.push({ charger_id: '', slot_id: '' });
        }
    } else {
        for (let i = previousNumber; i >= numberOfSlots; i--) {
            slots.splice(i, 1);
        }
    }
    setValues({ ...values, slots });

    // call formik onChange method
    field.onChange(e);
  }

  //helper
  //Alert helper methods
  const addChargerInventoryAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  function onSubmit(fields) {
      // display form field values on success
      const params = {
        charger_id:fields.charger_id,
        qr_code:fields.qr_code,
        hub_id:fields.hub_id,
        own_by:fields.own_by,
        charger_master_id:fields.charger_master_id,
        no_of_slot:fields.numberOfSlots,
        slots_data:fields.slots,
        remark_1:fields.remark_1,
        remark_2:fields.remark_2,
      }
      addChargerInventoryAPICall(params);
  }
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Charger Inventory</span>
            <a href="charger" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Charger Inventory List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={ChargerInventoryDetailsValidationSchema} 
        onSubmit={onSubmit}>
          {({handleChange,handleBlur,handleSubmit,values,touched,errors,setValues})=>(
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
                                Charger Id
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Charger Id"
                                  name="charger_id"
                                  value={values.charger_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.charger_id && touched.charger_id ? "input-error":null}
                                />
                                {errors.charger_id && touched.charger_id &&(
                                  <span className="error">{errors.charger_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                QR Code
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="QR Code "
                                  value={values.qr_code}
                                  name="qr_code"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.qr_code && touched.qr_code ? "input-error":null}
                                />
                                {errors.qr_code && touched.qr_code &&(
                                  <span className="error">{errors.qr_code}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Station
                                </Label>
                                <Input
                                  type="select"
                                  name="hub_id"
                                  placeholder="Station"
                                  value={values.hub_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>Select Station</option>
                                  {stationNameData.map((item,index)=>
                                    <option value={item.hub_master_id} key={index}>{item.name}</option>
                                  )}
                                </Input>
                                {errors.hub_id && touched.hub_id &&(
                                  <span className="error">{errors.hub_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Owned By
                                </Label>
                                <Input
                                  type="select"
                                  name="own_by"
                                  value={values.own_by}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>Select Owned By</option>
                                  {ownerNameData.map((item,index)=>
                                    <option value={item.owner_master_id} key={index}>{item.name}</option>
                                    )}
                                </Input>
                                {errors.own_by && touched.own_by &&(
                                  <span className="error">{errors.own_by}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Charger
                                </Label>
                                <Input
                                  type="select"
                                  name="charger_master_id"
                                  value={values.charger_master_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>Select Charger</option>
                                  {chargerMasterData.map((item,index)=>
                                    <option value={item.id} key={index}>{item.make+"-"+item.model+"-"+item.dimension}</option>
                                    )}
                                </Input>
                                {errors.charger_master_id && touched.charger_master_id &&(
                                  <span className="error">{errors.charger_master_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                Number of Slots
                                </Label>
                                <Field name="numberOfSlots">
                                    {({ field }) => (
                                        <input type="number" {...field} className={'form-control' + (errors.numberOfSlots && touched.numberOfSlots ? ' is-invalid' : '')} onChange={e => onChangeSlots(e, field, values, setValues)} />
                                    )}
                                    </Field>
                                {errors.numberOfSlots && touched.numberOfSlots &&(
                                  <span className="error">{errors.numberOfSlots}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={12}>
                            <FieldArray name="slots">
                              {() => (values.slots.map((ticket, i) => {
                                  const ticketErrors = errors.slots?.length && errors.slots[i] || {};
                                  const ticketTouched = touched.slots?.length && touched.slots[i] || {};
                                  return (
                                      <div key={i} className="list-group list-group-flush">
                                          <div className="list-group-item p-0">
                                              <div className="form-row">
                                                  <div className="form-group col-1 mt-3">
                                                    <h5 className="card-title">Slot#{i + 1}</h5>
                                                  </div>
                                                  {/* <div className="form-group col-5">
                                                      <label>Charger ID</label>
                                                      <Field name={`slots.${i}.charger_id`} type="text" className={'form-control' + (ticketErrors.charger_id && ticketTouched.charger_id ? ' is-invalid' : '' )} />
                                                      <ErrorMessage name={`slots.${i}.charger_id`} component="div" className="invalid-feedback" />
                                                  </div> */}
                                                  <div className="form-group col-6">
                                                      <label>Slot ID</label>
                                                      <Field name={`slots.${i}.slot_id`} type="text" className={'form-control' + (ticketErrors.slot_id && ticketTouched.slot_id ? ' is-invalid' : '' )} />
                                                      <ErrorMessage name={`slots.${i}.slot_id`} component="div" className="invalid-feedback" />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              }))}
                          </FieldArray>
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

export default AddCharger;
