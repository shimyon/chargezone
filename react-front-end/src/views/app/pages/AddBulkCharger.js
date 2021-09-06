import React, { useState, useEffect } from 'react';
import { 
  Row,FormGroup, Card,CardSubtitle,
  Label,Input, Button, Collapse,Form,Alert
 } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getOemAPI,addBulkChargerAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const AddBulkCharger = () => {
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //collapse states
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [collapse5, setCollapse5] = useState(false);
  const [collapse6, setCollapse6] = useState(false);
  const [collapse7, setCollapse7] = useState(false);
  //dropdown states
  const [oem,setOem] = useState("");
  const [oemList,setOemList] = useState([]);
  const [month,setMonth] = useState(null);
  const [year,setYear] = useState(null);
  //image states
  const [imageSelected,setImageSelected] = useState();
  const [imagePreview,setImagePreview] = useState();
  const [imageErrorFLag,setImageErrorFlag] = useState(false);
  const [imageKey,setImageKey] = useState(true); //boolean key to rerender input on removing image

  const history = useHistory();

  useEffect(()=>{
    getOemAPICall();
  },[])

  // //API calls
  const getOemAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getOemAPI,
      {type:"3"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        let tempData = [];
        if (responseData.status === 1) {          
          responseData.data.map(item=>{
            tempData.push({label: item.name, value: item.oem_id, id:item.oem_id});
          })
          setOemList(tempData);
        }else{
          addBulkChargerAlert(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const addBulkChargerAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addBulkChargerAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/pages/bulkcharger',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          addBulkChargerAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //Form Validation Schema
  const BulkChargerDetailsValidationSchema = yup.object().shape({
    model:yup.string()
        .required("Model name is required"),
    dimension:yup.string()
        .required("Dimension is required"),
  });

  const initialValues = {    
    model:"",
    battery_modules:"",
    battery_type:"",
    battery_capacity:"",
    battery_slot_dimension:"",
    no_of_connetor:"",
    battery_slot_indicator:"",
    charging_connector:"",
    gc_remark_1:"",
    gc_remark_2:"",
    voltage:"",
    max_input_power:"",
    frequency:"",
    current:"",
    thd_power_factor:"",
    protection:"",
    charging_voltage:"",
    output_power:"",
    max_charging_current:"",
    power_of_each_battery_slot:"",
    full_load_power_of_each_slot:"",
    input_impedance:"",
    static_voltage_regulation:"",
    ripple_and_noise:"",
    output_protection:"",
    efficiency:"",
    acoustic_noise:"",
    operating_temp:"",
    storage_temp:"",
    humidity:"",
    ambient_pressure:"",
    accessories:"",
    accessories:"",
    battery_door_locking:"",
    dimension:"",
    thickness:"",
    colour:"",
    cable_entry:"",
    alarms:"",
    emergency_protection:"",
    cooling:"",
    ip_rating:"",
    mechanical:"",
    surge_protection:"",
    power_connector:"",
    fire_safety:"",
    smoke_detector:"",
    thermal_detector:"",
    fire_suppresion_system:"",
    video_surevillance:"",
    water_level_sensor:"",
    mtbf:"",
    user_authentication:"",
    display:"",
    communication:"",
    indication:"",
    interface_mode:"",
    identification:"",
    user_interface:"",
    network_communication:"",
    application_use:"",
    ec_remark_1:"",
    ec_remark_2:"",
    tc_remark_1:"",
    tc_remark_2:"",
    mc_remark_1:"",
    mc_remark_2:"",
    p_remark_1:"",
    p_remark_2:"",
    w_remark_1:"",
    w_remark_2:"",
    i_remark_1:"",
    i_remark_2:"",
  };

  //helper
  const getYear = () => {
    let yearList = [];
    for (let index = 0; index <= 20; index++) {
      const temp = {label:2010+index,value:index+1,id:index+1}
      yearList.push(temp);
    }
    return yearList
  };
  //Alert helper methods
  const addBulkChargerAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //image selection methods
  const handleImageSelect = (imageFile) =>{
    const fileExtension = imageFile.name.split('.').pop();
    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png") {
      setImageErrorFlag(false);
      setImageSelected(imageFile);
      setImagePreview(URL.createObjectURL(imageFile));
    } else {
      setImageErrorFlag(true);
    }
  }
  const handleDeleteImage = () =>{
    setImageKey(!imageKey);
    setImagePreview();
    setImageSelected();
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={BulkChargerDetailsValidationSchema} 
        onSubmit={(values)=>{
          if (month == null || year == null) {
            addBulkChargerAlert("Make Year is required");
            return;
          }
          let formData = new FormData();
          const tempData={
            oem_name:oem.label,
            make:{month:month,year:year},
            battery_modules:values.battery_modules,
            battery_type:values.battery_type,
            battery_capacity:values.battery_capacity,
            battery_slot_dimension:values.battery_slot_dimension,
            no_of_connetor:values.no_of_connetor,
            battery_slot_indicator:values.battery_slot_indicator,
            charging_connector:values.charging_connector,
            voltage:values.voltage,
            max_input_power:values.max_input_power,
            frequency:values.frequency,
            current:values.current,
            thd_power_factor:values.thd_power_factor,
            protection:values.protection,
            charging_voltage:values.charging_voltage,
            output_power:values.output_power,
            max_charging_current:values.max_charging_current,
            power_of_each_battery_slot:values.power_of_each_battery_slot,
            full_load_power_of_each_slot:values.full_load_power_of_each_slot,
            input_impedance:values.input_impedance,
            static_voltage_regulation:values.static_voltage_regulation,
            ripple_and_noise:values.ripple_and_noise,
            output_protection:values.output_protection,
            efficiency:values.efficiency,
            acoustic_noise:values.acoustic_noise,
            operating_temp:values.operating_temp,
            storage_temp:values.storage_temp,
            humidity:values.humidity,
            ambient_pressure:values.ambient_pressure,
            accessories:values.accessories,
            accessories:values.accessories,
            battery_door_locking:values.battery_door_locking,
            thickness:values.thickness,
            colour:values.colour,
            cable_entry:values.cable_entry,
            alarms:values.alarms,
            emergency_protection:values.emergency_protection,
            cooling:values.cooling,
            ip_rating:values.ip_rating,
            mechanical:values.mechanical,
            surge_protection:values.surge_protection,
            power_connector:values.power_connector,
            fire_safety:values.fire_safety,
            smoke_detector:values.smoke_detector,
            thermal_detector:values.thermal_detector,
            fire_suppresion_system:values.fire_suppresion_system,
            video_surevillance:values.video_surevillance,
            water_level_sensor:values.water_level_sensor,
            mtbf:values.mtbf,
            user_authentication:values.user_authentication,
            display:values.display,
            communication:values.communication,
            indication:values.indication,
            interface_mode:values.interface_mode,
            identification:values.identification,
            user_interface:values.user_interface,
            network_communication:values.network_communication,
            application_use:values.application_use,
            ec_remark_1:values.ec_remark_1,
            ec_remark_2:values.ec_remark_2,
            tc_remark_1:values.tc_remark_1,
            tc_remark_2:values.tc_remark_2,
            mc_remark_1:values.mc_remark_1,
            mc_remark_2:values.mc_remark_2,
            p_remark_1:values.p_remark_1,
            p_remark_2:values.p_remark_2,
            w_remark_1:values.w_remark_1,
            w_remark_2:values.w_remark_2,
            i_remark_1:values.i_remark_1,
            i_remark_2:values.i_remark_2,
          }
          formData.append('oem_id',oem.value);
          formData.append('model',values.model,);
          formData.append('dimension',values.dimension);
          formData.append('make',month.label+"-"+year.label);
          formData.append('img_file',imageSelected);
          formData.append('remark_1',values.gc_remark_1);
          formData.append('remark_2',values.gc_remark_2);
          formData.append('all_data',JSON.stringify(tempData));
          addBulkChargerAPICall(formData);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors,isValid})=>(
            <>
              <Row>
                <Colxx xxs="12">
                    <span className="page_title">Add Bulk Charger</span>
                      <Button color="light" className="default float-right" onClick={()=>history.goBack()}>
                          <b>Cancel</b>
                      </Button>
                      <Button color="primary" className="default mr-2 float-right" onClick={handleSubmit} disabled={buttonDisabled}>
                        <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Add</b>
                      </Button>              
                  <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="12" lg="12">
                  <ul className="list-unstyled mb-4">
                    <li>
                      <CardSubtitle className="mb-3">
                        <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                          {alertMsg}
                        </Alert>
                      </CardSubtitle>
                    </li>
                    <li>
                      <Card className={isValid?"question d-flex mb-4":"question d-flex mb-4 cardBorderError"}>
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">1</span>
                              General Characteristics
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse1 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse1(!collapse1)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse1}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                                <Row>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                        OEM
                                      </Label>
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Select OEM"
                                        value={oem}
                                        onChange={(e) => setOem(e)}
                                        options={oemList}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Model Name
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Model Name"
                                        name="model"
                                        value={values.model}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.model && touched.model ? "input-error":null}
                                      />
                                      {errors.model && touched.model &&(
                                        <span className="error">{errors.model}</span>
                                      )}
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Make Year
                                      </Label>
                                      <Row>
                                      <Colxx md="6">
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Month"
                                        value={month}
                                        onChange={(e) => setMonth(e)}
                                        options={[
                                          { label: 'January', value: '1', id: 1 },
                                          { label: 'February', value: '2', id: 2 },
                                          { label: 'March', value: '3', id: 3 },
                                          { label: 'April', value: '4', id: 4 },
                                          { label: 'May', value: '5', id: 6 },
                                          { label: 'June', value: '6', id: 7 },
                                          { label: 'July', value: '7', id: 8 },
                                          { label: 'August', value: '8', id: 9 },
                                          { label: 'September', value: '9', id: 10 },
                                          { label: 'October', value: '10', id: 11 },
                                          { label: 'November', value: '11', id: 12 },
                                          { label: 'December', value: '12', id: 13 },
                                        ]}
                                      />
                                      </Colxx>
                                      <Colxx md="6">
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Year"
                                        value={year}
                                        onChange={(e) => setYear(e)}
                                        options={getYear()}
                                      />
                                      </Colxx>
                                      </Row>
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx md={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery modules 
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery modules "
                                        name="battery_modules"
                                        value={values.battery_modules}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx md={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery Type (AH)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery Type (AH)"
                                        name="battery_type"
                                        value={values.battery_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery Capacity (AH)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery Capacity (AH)"
                                        name="battery_capacity"
                                        value={values.battery_capacity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery slot dimension
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery slot dimension"
                                        name="battery_slot_dimension"
                                        value={values.battery_slot_dimension}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      No. of connetor
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="no. of connetor"
                                        name="no_of_connetor"
                                        value={values.no_of_connetor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery slot indicator
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery slot indicator"
                                        name="battery_slot_indicator"
                                        value={values.battery_slot_indicator}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Charging Connector
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Charging Connector"
                                        name="charging_connector"
                                        value={values.charging_connector}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                        Image
                                      </Label>
                                      <Input
                                        key={imageKey}
                                        type="file"
                                        name="upload_image"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={e=>handleImageSelect(e.target.files[0])}
                                      />
                                      {imageErrorFLag && 
                                        <span className="error">Image must be either png,jpg or jpeg format</span>
                                      }
                                    </FormGroup>
                                  </Colxx>
                                  {imagePreview!=null &&
                                    <Colxx sm={3}>
                                      <div>
                                        <Button className="custom-badge default tbl_action_btn" onClick={()=>handleDeleteImage()}><i className="glyph-icon simple-icon-trash image-remove-icon"></i></Button>
                                        <img src={imagePreview} height="100px" width="150px" alt="Image Preview"/>
                                      </div>
                                    </Colxx>
                                  }
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="gc_remark_1"
                                        value={values.gc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="gc_remark_2"
                                        value={values.gc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                    </li>
                    <li>
                      <Card className="question d-flex mb-4">
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">2</span>
                              Electrical Characteristics
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse2 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse2(!collapse2)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse2}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                              <Row>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Voltage
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Voltage"
                                        name="voltage"
                                        value={values.voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Max input power
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Max input power"
                                        name="max_input_power"
                                        value={values.max_input_power}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Frequency
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Frequency"
                                        name="frequency"
                                        value={values.frequency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Current 
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Current"
                                        name="current"
                                        value={values.current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      THD/Power Factor
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="THD/Power Factor"
                                        name="thd_power_factor"
                                        value={values.thd_power_factor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Protection
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Protection"
                                        name="protection"
                                        value={values.protection}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Charging Voltage
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Charging Voltage"
                                        name="charging_voltage"
                                        value={values.charging_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Output power
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Output power"
                                        name="output_power"
                                        value={values.output_power}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Max charging current
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Max charging current"
                                        name="max_charging_current"
                                        value={values.max_charging_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Power of each battery slot
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Power of each battery slot"
                                        name="power_of_each_battery_slot"
                                        value={values.power_of_each_battery_slot}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Full load power of each slot
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Full load power of each slot"
                                        name="full_load_power_of_each_slot"
                                        value={values.full_load_power_of_each_slot}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Input impedance
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Input impedance"
                                        name="input_impedance"
                                        value={values.input_impedance}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Static voltage regulation
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Static voltage regulation"
                                        name="static_voltage_regulation"
                                        value={values.static_voltage_regulation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Ripple and noise
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Ripple and noise"
                                        name="ripple_and_noise"
                                        value={values.ripple_and_noise}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Output protection
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Output protection"
                                        name="output_protection"
                                        value={values.output_protection}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Efficiency
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Efficiency"
                                        name="efficiency"
                                        value={values.efficiency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Acoustic Noise
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Acoustic Noise"
                                        name="acoustic_noise"
                                        value={values.acoustic_noise}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="ec_remark_1"
                                        value={values.ec_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="ec_remark_2"
                                        value={values.ec_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">3</span>
                                Temprature Characteristics
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse3 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse3(!collapse3)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse3}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                  <Row>                        
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Operating Temp.
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Operating Temp."
                                          name="operating_temp"
                                          value={values.operating_temp}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Storage Temp.
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Storage Temp."
                                          name="storage_temp"
                                          value={values.storage_temp}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Humidity
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Humidity"
                                          name="humidity"
                                          value={values.humidity}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Temp. sensor
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Temp. sensor"
                                          name="temperature_sensor"
                                          value={values.temperature_sensor}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="tc_remark_1"
                                        value={values.tc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="tc_remark_2"
                                        value={values.tc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>                          
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                        <Card className={isValid?"question d-flex mb-4":"question d-flex mb-4 cardBorderError"}>
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">4</span>
                                Mechanical Characteristics
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse4 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse4(!collapse4)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse4}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Ambient pressure
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Ambient pressure"
                                          name="ambient_pressure"
                                          value={values.ambient_pressure}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Accessories
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Accessories"
                                          name="accessories"
                                          value={values.accessories}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Battery door locking
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Battery door locking"
                                          name="battery_door_locking"
                                          value={values.battery_door_locking}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Dimension
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Dimension"
                                          name="dimension"
                                          value={values.dimension}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                         {errors.dimension && touched.dimension &&(
                                            <span className="error">{errors.dimension}</span>
                                          )}
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Thickness
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Thickness"
                                          name="thickness"
                                          value={values.thickness}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Colour
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Colour"
                                          name="colour"
                                          value={values.colour}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Cable entry
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Cable entry"
                                          name="cable_entry"
                                          value={values.cable_entry}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx> 
                                    <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="mc_remark_1"
                                        value={values.mc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="mc_remark_2"
                                        value={values.mc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                      <Card className="question d-flex mb-4">
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">5</span>
                              Protections
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse5 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse5(!collapse5)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse5}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                              <Row>
                                <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Alarms
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Alarms"
                                        name="alarms"
                                        value={values.alarms}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Emergency protection
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Emergency protection"
                                        name="emergency_protection"
                                        value={values.emergency_protection}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Cooling
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cooling"
                                        name="cooling"
                                        value={values.cooling}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      IP Rating
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="IP Rating"
                                        name="ip_rating"
                                        value={values.ip_rating}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Mechanical
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Mechanical"
                                        name="mechanical"
                                        value={values.mechanical}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Surge protection
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Surge protection"
                                        name="surge_protection"
                                        value={values.surge_protection}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Power Connector
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Power Connector"
                                          name="power_connector"
                                          value={values.power_connector}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Fire safety
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Fire safety"
                                          name="fire_safety"
                                          value={values.fire_safety}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Smoke Detector
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Smoke Detector"
                                          name="smoke_detector"
                                          value={values.smoke_detector}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Thermal Detector
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Thermal Detector"
                                          name="thermal_detector"
                                          value={values.thermal_detector}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Fire suppresion system
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Fire suppresion system"
                                          name="fire_suppresion_system"
                                          value={values.fire_suppresion_system}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Video Surevillance
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Video Surevillance"
                                          name="video_surevillance"
                                          value={values.video_surevillance}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Water level sensor
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Water level sensor"
                                          name="water_level_sensor"
                                          value={values.water_level_sensor}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="p_remark_1"
                                        value={values.p_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="p_remark_2"
                                        value={values.p_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx> 
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">6</span>
                                Warranty
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse6 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse6(!collapse6)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse6}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        MTBF
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="MTBF"
                                          name="mtbf"
                                          value={values.mtbf}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="w_remark_1"
                                        value={values.w_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="w_remark_2"
                                        value={values.w_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">7</span>
                                Interface
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse7 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse7(!collapse7)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse7}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        User Authentication
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="User Authentication"
                                          name="user_authentication"
                                          value={values.user_authentication}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Display
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Display"
                                          name="display"
                                          value={values.display}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Communication 
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Communication "
                                          name="communication"
                                          value={values.communication}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Indication
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Indication"
                                          name="indication"
                                          value={values.indication}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Interface mode
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Interface mode"
                                          name="interface_mode"
                                          value={values.interface_mode}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Identification
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Identification"
                                          name="identification"
                                          value={values.identification}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        User interface
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="User interface"
                                          name="user_interface"
                                          value={values.user_interface}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Netwrok Communication
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Netwrok Communication"
                                          name="network_communication"
                                          value={values.network_communication}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Application use
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Application use"
                                          name="application_use"
                                          value={values.application_use}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="i_remark_1"
                                        value={values.i_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="i_remark_2"
                                        value={values.i_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                  </ul>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>
    </>
  );
};

export default AddBulkCharger;

{/* <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Bulk Charger</span>
            <a href="bulkcharger" className="btn btn-light default btn-sm float-right">
                <b>Cancel</b>
            </a>
            <Button color="primary" className="default mr-2 btn-sm float-right">
                <b>Add</b>
            </Button>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
        <ul className="list-unstyled mb-4">
        <li>
            <Card className="question d-flex mb-4">
              <div className="d-flex flex-grow-1 min-width-zero">
                <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                  <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                    <span className="heading-number d-inline-block">1</span>
                    General Characteristics
                  </div>
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <Button
                    outline
                    color="theme-3"
                    className={`icon-button ml-1 rotate-icon-click ${
                      collapse1 ? 'rotate' : ''
                    }`}
                    onClick={() => setCollapse1(!collapse1)}
                  >
                    <i className="simple-icon-arrow-down" />
                  </Button>
                </div>
              </div>
              <Collapse isOpen={collapse1}>
                <div className="card-body pt-0">
                  <div className="edit-mode">
                    <Form>
                      <Row>
                          <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            OEM
                            </Label>
                            <Input
                              type="text"
                              placeholder="OEM"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Model Name
                            </Label>
                            <Input
                              type="text"
                              placeholder="Model Name"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Make Year
                            </Label>
                            <Input
                              type="text"
                              placeholder="Make"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Battery Modules
                            </Label>
                            <Input
                              type="text"
                              placeholder="Battery Modules"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Battery Type
                            </Label>
                            <Input
                              type="text"
                              placeholder="Battery Type"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Battery Capacity
                            </Label>
                            <Input
                              type="text"
                              placeholder="Battery Capacity"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Battery Slot Dimension
                            </Label>
                            <Input
                              type="text"
                              placeholder="Battery Slot Dimension"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            No. of Connetor
                            </Label>
                            <Input
                              type="text"
                              placeholder="No. of Connetor"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Battery Slot Indicator
                            </Label>
                            <Input
                              type="text"
                              placeholder="Battery Slot Indicator"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Charging Connector
                            </Label>
                            <Input
                              type="text"
                              placeholder="Charging Connector"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Remark1
                            </Label>
                            <Input
                              type="text"
                              placeholder="Remark1"
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx sm={3}>
                          <FormGroup>
                            <Label>
                            Remark2
                            </Label>
                            <Input
                              type="text"
                              placeholder="Remark2"
                            />
                          </FormGroup>
                        </Colxx>
                      </Row>
                    </Form>
                  </div>
                </div>
              </Collapse>
            </Card>
            </li>
            <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">2</span>
                      Electrical Characteristics
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse2 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse2(!collapse2)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse2}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Voltage
                              </Label>
                              <Input
                                type="text"
                                placeholder="Voltage"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Max. Input Power
                              </Label>
                              <Input
                                type="text"
                                placeholder="Max. Input Power"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Frequency
                              </Label>
                              <Input
                                type="text"
                                placeholder="Frequency"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Current
                              </Label>
                              <Input
                                type="text"
                                placeholder="Current"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              THD/Power Factor
                              </Label>
                              <Input
                                type="text"
                                placeholder="THD/Power Factor"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Protection
                              </Label>
                              <Input
                                type="text"
                                placeholder="Protection"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Charging Voltage
                              </Label>
                              <Input
                                type="text"
                                placeholder="Charging Voltage"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Output Power
                              </Label>
                              <Input
                                type="text"
                                placeholder="Output Power"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Max. Charging Current
                              </Label>
                              <Input
                                type="text"
                                placeholder="Max. Charging Current"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Power of Each Battery Slot
                              </Label>
                              <Input
                                type="text"
                                placeholder="Power of Each Battery Slot"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Full load power of Each Slot
                              </Label>
                              <Input
                                type="text"
                                placeholder="Full load power of Each Slot"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Input Impedance
                              </Label>
                              <Input
                                type="text"
                                placeholder="Input Impedance"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Static Voltage Regulation
                              </Label>
                              <Input
                                type="text"
                                placeholder="Static Voltage Regulation"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Ripple and Noise
                              </Label>
                              <Input
                                type="text"
                                placeholder="Ripple and Noise"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Output Protection
                              </Label>
                              <Input
                                type="text"
                                placeholder="Output Protection"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Efficiency
                              </Label>
                              <Input
                                type="text"
                                placeholder="Efficiency"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Acoustic Noise
                              </Label>
                              <Input
                                type="text"
                                placeholder="Acoustic Noise"
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
              <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">3</span>
                      Temp. Characteristics
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse3 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse3(!collapse3)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse3}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Operating Temp.
                              </Label>
                              <Input
                                type="text"
                                placeholder="Operating Temp."
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Storage Temp.
                              </Label>
                              <Input
                                type="text"
                                placeholder="Storage Temp."
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Humidity
                              </Label>
                              <Input
                                type="text"
                                placeholder="Humidity"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Ambient Pressure
                              </Label>
                              <Input
                                type="text"
                                placeholder="Ambient Pressure"
                              />
                            </FormGroup>
                          </Colxx> 
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Temp. Sensor
                              </Label>
                              <Input
                                type="text"
                                placeholder="Temp. Sensor"
                              />
                            </FormGroup>
                          </Colxx>     
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
              <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">4</span>
                      Mechanical characteristics
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse4 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse4(!collapse4)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse4}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Accessories
                              </Label>
                              <Input
                                type="text"
                                placeholder="Accessories"
                              />
                            </FormGroup>
                          </Colxx>                                    
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Battery Door Locking
                              </Label>
                              <Input
                                type="text"
                                placeholder="Battery Door Locking"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Dimension
                              </Label>
                              <Input
                                type="text"
                                placeholder="Dimension"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Thickness
                              </Label>
                              <Input
                                type="text"
                                placeholder="Thickness"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Colour
                              </Label>
                              <Input
                                type="text"
                                placeholder="Colour"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Cable entry
                              </Label>
                              <Input
                                type="text"
                                placeholder="Cable entry"
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
              <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">5</span>
                      Protections
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse5 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse5(!collapse5)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse5}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Alarms
                              </Label>
                              <Input
                                type="text"
                                placeholder="Alarms"
                              />
                            </FormGroup>
                          </Colxx>                  
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Emergency Protection
                              </Label>
                              <Input
                                type="text"
                                placeholder="Emergency Protection"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Cooling
                              </Label>
                              <Input
                                type="text"
                                placeholder="Cooling"
                              />
                            </FormGroup>
                          </Colxx>                  
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              IP Rating
                              </Label>
                              <Input
                                type="text"
                                placeholder="IP Rating"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Mechanical
                              </Label>
                              <Input
                                type="text"
                                placeholder="Mechanical"
                              />
                            </FormGroup>
                          </Colxx>                  
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Surge Protection
                              </Label>
                              <Input
                                type="text"
                                placeholder="Surge Protection"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Fire & Safety
                              </Label>
                              <Input
                                type="text"
                                placeholder="Fire & Safety"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Smoke Detector
                              </Label>
                              <Input
                                type="text"
                                placeholder="Smoke Detector"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Thermal Detector
                              </Label>
                              <Input
                                type="text"
                                placeholder="Thermal Detector"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Fire Suppresion System
                              </Label>
                              <Input
                                type="text"
                                placeholder="Fire Suppresion System"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Video Surevillance
                              </Label>
                              <Input
                                type="text"
                                placeholder="Video Surevillance"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={3}>
                            <FormGroup>
                              <Label>
                              Water Level Sensor
                              </Label>
                              <Input
                                type="text"
                                placeholder="Water Level Sensor"
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
              <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">6</span>
                      Warranty
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse6 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse6(!collapse6)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse6}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={12}>
                            <FormGroup>
                              <Label>
                              MTBF
                              </Label>
                              <Input
                                type="text"
                                placeholder="MTBF"
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
              <li>
              <Card className="question d-flex mb-4">
                <div className="d-flex flex-grow-1 min-width-zero">
                  <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                    <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                      <span className="heading-number d-inline-block">7</span>
                      Interface
                    </div>
                  </div>
                  <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                    <Button
                      outline
                      color="theme-3"
                      className={`icon-button ml-1 rotate-icon-click ${
                        collapse7 ? 'rotate' : ''
                      }`}
                      onClick={() => setCollapse7(!collapse7)}
                    >
                      <i className="simple-icon-arrow-down" />
                    </Button>
                  </div>
                </div>
                <Collapse isOpen={collapse7}>
                  <div className="card-body pt-0">
                    <div className="edit-mode">
                      <Form>
                        <Row>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              User Authentication
                              </Label>
                              <Input
                                type="text"
                                placeholder="User Authentication"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Display
                              </Label>
                              <Input
                                type="text"
                                placeholder="Display"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Communication
                              </Label>
                              <Input
                                type="text"
                                placeholder="Communication"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Indication
                              </Label>
                              <Input
                                type="text"
                                placeholder="Indication"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Interface mode
                              </Label>
                              <Input
                                type="text"
                                placeholder="Interface mode"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Identification
                              </Label>
                              <Input
                                type="text"
                                placeholder="Identification"
                              />
                            </FormGroup>
                          </Colxx>                  
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              User Interface
                              </Label>
                              <Input
                                type="text"
                                placeholder="User Interface"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Network Communication
                              </Label>
                              <Input
                                type="text"
                                placeholder="Network Communication"
                              />
                            </FormGroup>
                          </Colxx>
                          <Colxx sm={4}>
                            <FormGroup>
                              <Label>
                              Application Use
                              </Label>
                              <Input
                                type="text"
                                placeholder="Application Use"
                              />
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Collapse>
              </Card>
              </li>
          </ul>
        </Colxx>
      </Row> */}