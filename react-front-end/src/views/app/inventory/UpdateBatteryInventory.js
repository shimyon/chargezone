import React,{useState,useEffect} from 'react';
import { 
  Row,Card, CardBody,CardSubtitle,Alert, FormGroup, Label,
  Input, Button
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getBatteryDataAPI,getOwnersAPI,getStationsAPI,updateBatteryInventoryAPI,getBatteryInventoryByIdAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const UpdateBatteryInventory = () => {
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //dropdown states
  const [stationNameData,setStationNameData] = useState([]);
  const [ownerNameData,setOwnerNameData] = useState([]);
  const [batteryData,setBatteryData] = useState([]);
  //states
  const [bin,setBin] = useState("");
  const [serialNumber,setSerialNumber] = useState("");
  const [bQrCode,setBQrCode] = useState("");
  const [hubId,setHubId] = useState("");
  const [ownBy,setOwnBy] = useState("");
  const [batteryMasterId,setBatteryMasterId] = useState("");
  const [imei,setImei] = useState("");
  const [soc,setSoc] = useState("");
  const [bv,setBv] = useState("");
  const [rec,setRec] = useState("");
  const [lat,setLat] = useState("");
  const [lon,setLon] = useState("");
  const [remark,setRemark] = useState("");

  const history = useHistory();
  const location = useLocation();


  useEffect(()=>{
    GetStationNamesAPICall();
    GetOwnerNamesAPICall();
    GetBatteryDataAPICall();
    getBatteryInventoryByIdAPICall();
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
  const GetBatteryDataAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getBatteryDataAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setBatteryData(responseData.data)
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const getBatteryInventoryByIdAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getBatteryInventoryByIdAPI,
    {
        battery_inventory_id:location.state.battery_inventory_id
    },
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
        setBin(responseData.data.bin);
        setSerialNumber(responseData.data.serial_number);
        setBQrCode(responseData.data.b_qr_code);
        setHubId(responseData.data.hub_id);
        setOwnBy(responseData.data.own_by);
        setBatteryMasterId(responseData.data.battery_master_id);
        setImei(responseData.data.imei);
        setSoc(responseData.data.soc);
        setBv(responseData.data.bv);
        setRec(responseData.data.rec);
        setLat(responseData.data.lat);
        setLon(responseData.data.lon);
        setRemark(responseData.data.remark);
        }else{
        console.log(responseData.msg);
        }
    }).catch(error=>{
        console.log(error);
    })
}
  const updateBatteryInventoryAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(updateBatteryInventoryAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/inventory/battery',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          UpdateBatteryInventoryAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //Form Validation Schema
  const BatteryInventoryDetailsValidationSchema = yup.object().shape({
    bin:yup.string()
        .required("BIN is required"),
    serial_number:yup.string()
        .required("Serial Number capacity is required"),
    b_qr_code:yup.string()
        .matches(/^\d+$/,"Only numbers allowed")
        .required("Battery QR Code capacity is required"),
    own_by:yup.string()
        .required("Owned By is required"),
    battery_master_id:yup.string()
        .required("Battery is required"),
    imei:yup.string()
        .required("IMEI is required"),
    // soc:yup.string()
    //     .required("EV capacity is required"),
    // bv:yup.string()
    //     .required("BV is required"),
    // rec:yup.string()
    //     .required("Rec is required"),
    // lat:yup.string()
    //     .required("Latitude is required"),
    // lon:yup.string()
    //     .required("Longitude is required"),
  });

  //helper
  //Alert helper methods
  const UpdateBatteryInventoryAlert = (msg)=>{
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
            <span className="page_title">Update Battery Inventory</span>
            <a href="battery" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Battery Inventory List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={{
            bin:bin,
            serial_number:serialNumber,
            b_qr_code:bQrCode,
            hub_id:hubId,
            own_by:ownBy,
            battery_master_id:batteryMasterId,
            imei:imei,
            soc:soc,
            bv:bv,
            rec:rec,
            lat:lat,
            lon:lon,
            remark:remark,
        }}
        validationSchema={BatteryInventoryDetailsValidationSchema} 
        onSubmit={(values)=>{
            const params = {
                battery_inventory_id:location.state.battery_inventory_id,
                bin:values.bin,
                serial_number:values.serial_number,
                b_qr_code:values.b_qr_code,
                hub_id:values.hub_id,
                own_by:values.own_by,
                battery_master_id:values.battery_master_id,
                imei:values.imei,
                soc:values.soc,
                bv:values.bv,
                rec:values.rec,
                lat:values.lat,
                lon:values.lon,
                remark:values.remark,
            }
          updateBatteryInventoryAPICall(params);
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
                                BIN
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="BIN"
                                  name="bin"
                                  value={values.bin}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.bin && touched.bin ? "input-error":null}
                                />
                                {errors.bin && touched.bin &&(
                                  <span className="error">{errors.bin}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Serial Number
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Serial Number"
                                  value={values.serial_number}
                                  name="serial_number"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.serial_number && touched.serial_number ? "input-error":null}
                                />
                                {errors.serial_number && touched.serial_number &&(
                                  <span className="error">{errors.serial_number}</span>
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
                                  {stationNameData.map((item)=>
                                    <option value={item.hub_master_id} key={item.hub_master_id}>{item.name}</option>
                                  )}
                                </Input>
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
                                  {ownerNameData.map(item=>
                                    <option value={item.owner_master_id} key={item.owner_master_id}>{item.name}</option>
                                    )}
                                </Input>
                                {errors.own_by && touched.own_by &&(
                                  <span className="error">{errors.own_by}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Battery
                                </Label>
                                <Input
                                  type="select"
                                  name="battery_master_id"
                                  value={values.battery_master_id}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >
                                  <option>Select Battery</option>
                                  {batteryData.map(item=>
                                    <option value={item.battery_master_id} key={item.battery_master_id}>{item.model_name+"-"+item.make_year+"-"+item.type_of_connector}</option>
                                    )}
                                </Input>
                                {errors.battery_master_id && touched.battery_master_id &&(
                                  <span className="error">{errors.battery_master_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Battery QR Code
                                </Label>
                                <Input
                                  type="text"
                                  name="b_qr_code"
                                  placeholder="Battery QR Code"
                                  value={values.b_qr_code}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.b_qr_code && touched.b_qr_code &&(
                                  <span className="error">{errors.b_qr_code}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                BV
                                </Label>
                                <Input
                                  type="text"
                                  name="bv"
                                  placeholder="BV"
                                  value={values.bv}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.bv && touched.bv &&(
                                  <span className="error">{errors.bv}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={3}>
                              <FormGroup>
                                <Label>
                                SOC
                                </Label>
                                <Input
                                  type="text"
                                  name="soc"
                                  placeholder="SOC"
                                  value={values.soc}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.soc && touched.soc &&(
                                  <span className="error">{errors.soc}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                IMEI
                                </Label>
                                <Input
                                  type="text"
                                  name="imei"
                                  placeholder="IMEI"
                                  value={values.imei}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.imei && touched.imei &&(
                                  <span className="error">{errors.imei}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Rec
                                </Label>
                                <Input
                                  type="text"
                                  name="rec"
                                  placeholder="Rec"
                                  value={values.rec}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.rec && touched.rec &&(
                                  <span className="error">{errors.rec}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Latitude
                                </Label>
                                <Input
                                  type="text"
                                  name="lat"
                                  placeholder="Latitude"
                                  value={values.lat}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.lat && touched.lat &&(
                                  <span className="error">{errors.lat}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Longitude
                                </Label>
                                <Input
                                  type="text"
                                  name="lon"
                                  placeholder="Longitude"
                                  value={values.lon}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                 {errors.lon && touched.lon &&(
                                  <span className="error">{errors.lon}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Remark
                                </Label>
                                <Input
                                  type="text"
                                  name="remark"
                                  placeholder="Remark"
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

export default UpdateBatteryInventory;
