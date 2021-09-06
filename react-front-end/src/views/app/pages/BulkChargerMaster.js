import React,{useState,useEffect} from 'react';
import { Row, Card, CardBody, CardSubtitle, Table, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  Input,InputGroup 
 } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getBulkChargerListAPI,deleteBulkChargerAPI, adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';

const BulkChargerMaster = () => {
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
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  const [infoModalVisible,setInfoModalVisible] = useState(false);
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //bulkCharger list
  const [bulkChargerList,setBulkChargerList] = useState([]);
  const [bulkChargerID,setBulkChargerID] = useState("");
  const [bulkChargerToDeleteId,setBulkChargerToDeleteId] = useState("");
  //data states
  const [bulkChargerInfo,setBulkChargerInfo] = useState({});
  const [bulkChargerAllData,setBulkChargerAllData] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getBulkChargerListAPICall();
    bulkChargerAlert();
  },[bulkChargerID,pageCount])

  //API calls
  const getBulkChargerListAPICall = async() => {
    setBulkChargerList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getBulkChargerListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setBulkChargerList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  const deleteBulkChargerAPICall = async(bulkChargerId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteBulkChargerAPI,
      {charger_master_id:bulkChargerId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setBulkChargerID(bulkChargerId);
          bulkChargerDeletedAlert(responseData.status,responseData.msg)
        }else{
          bulkChargerDeletedAlert(responseData.status,responseData.msg)
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //Helper methods
  const updatebulkCharger = (bulkChargerId) => {
    history.push({
      pathname:adminRoot+'/pages/updatebulkcharger',
      state:{bulkCharger_master_id:bulkChargerId}
    });
  }

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
  const bulkChargerDeletedAlert = (status,msg)=>{
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
  const bulkChargerAlert = () =>{
    if (location.state === null || location.state === undefined) {
      return;
    }else{
      if (location.state.responseStatus === 1) {
        setAlertVisible(true);
        setAlertMsg(location.state.responseMsg);
        setAlertColor("success");
        history.replace({
          state: null,
        })
      }else{
        setAlertVisible(true);
        setAlertMsg(location.state.responseMsg);
        setAlertColor("danger");
        history.replace({
          state: null,
        })
      }
    }
  }
  //Modal helper methods
  const toggleModal = (bulkChargerId) => {
    setBulkChargerToDeleteId(bulkChargerId)
    setModalVisible(!modalVisible);
  }
  //modal for all data
  const toggleInfoModal = (bulkChargerItem) => {
    let tempAllData = {};
    if (bulkChargerItem.all_data==undefined) {
      tempAllData = {};
    }else {
      tempAllData = JSON.parse(bulkChargerItem.all_data);
      setBulkChargerInfo(bulkChargerItem);
      setBulkChargerAllData(tempAllData)
    }    
    setInfoModalVisible(!infoModalVisible);
  }
    //handle search input
    const handleSearch = () => {
        setPageCount(1);
        getBulkChargerListAPICall();
    }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Bulk Charger</span>
            <a href="addbulkcharger" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-plus"></i> Add New</b>
            </a>
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
              <span>Page </span>
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
                    <th>OEM</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Dimension</th>
                    <th>No. Of Connectors</th>
                    <th>Output Power</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="8"><div className="custom-list-loading" /></td>
                  </tr> : 
                    bulkChargerList.length > 0 ?
                      bulkChargerList.map((item,index)=>
                      <tr key={index}>
                      <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                      <td>{item.oem_name}</td>
                      <td>{item.make}</td>
                      <td>{item.model}</td>
                      <td>{item.dimension}</td>
                      <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).no_of_connetor:""}</td>
                      <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).output_power:""}</td>
                      <td>
                      {item.all_data!=null && <Button color="primary" className="default mr-1 btn-sm tbl_action_btn" onClick={()=>{toggleInfoModal(item)}}>
                            <i className="glyph-icon simple-icon-eye"></i>
                        </Button>}
                        <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updatebulkCharger(item.id)}}>
                            <i className="glyph-icon simple-icon-pencil text-white"></i>
                        </a>
                        <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.id)}}>
                            <i className="glyph-icon simple-icon-trash"></i>
                        </Button>                        
                      </td>
                    </tr>
                    ):<tr>
                          <td className="text-center text-danger" colSpan="8">Data  Not  Found</td>
                      </tr>
                    }
                </tbody>
              </Table>
              <Modal
                isOpen={modalVisible}
                toggle={toggleModal} >
                <ModalHeader className="text-center">
                  Are you sure you would like to delete this bulkCharger?
                  <Button color="success" className="mt-4" onClick={()=>deleteBulkChargerAPICall(bulkChargerToDeleteId)}>
                    Delete 
                  </Button>{' '}
                  <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalHeader>
              </Modal>
            </CardBody>
          </Card>
        </Colxx>
        <div className="modal-dialog modal-fullscreen" >
          <Modal
            isOpen={infoModalVisible}
            toggle={toggleInfoModal} 
            className="modal-fullscreen">
            <ModalBody>
              <Row>
                <Colxx md="12">
                    <i className="simple-icon-close float-right mr-4 close-icon" onClick={toggleInfoModal}></i>
                </Colxx>
              </Row>
              <Row className="mt-2">
                  <Colxx xxs="12" lg="12">
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
                              <Row>
                                <Colxx md="6">
                                  <b>OEM:</b> {bulkChargerAllData.oem_name}
                                </Colxx>
                                <Colxx md="6" >
                                  <b>Model:</b> {bulkChargerInfo.model}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Make Year:</b> {bulkChargerInfo.make}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery modules :</b> {bulkChargerAllData.battery_modules}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery Type :</b> {bulkChargerAllData.battery_type}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery Capacity :</b> {bulkChargerAllData.battery_capacity}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery slot Dimension :</b> {bulkChargerAllData.battery_slot_dimension}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>No. of Connetor :</b> {bulkChargerAllData.no_of_connetor}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                 <b> Battery Slot Indicator:</b> {bulkChargerAllData.battery_slot_indicator}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Charging Connector :</b> {bulkChargerAllData.charging_connector}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark1 :</b> {bulkChargerInfo.remark_1}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark2 :</b> {bulkChargerInfo.remark_2}
                                </Colxx>
                              </Row>
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
                              <Row>
                                <Colxx md="6">
                                  <b>Voltage:</b> {bulkChargerAllData.voltage}
                                </Colxx>
                                <Colxx md="6" >
                                  <b>Max. Input Power:</b> {bulkChargerAllData.max_input_power}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Frequency:</b> {bulkChargerAllData.frequency}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Current:</b> {bulkChargerAllData.current}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>THD/Power Factor :</b> {bulkChargerAllData.thd_power_factor}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Protection :</b> {bulkChargerAllData.protection}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Charging Voltage :</b> {bulkChargerAllData.charging_voltage}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Output Power :</b> {bulkChargerAllData.output_power}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Max. Charging Current:</b> {bulkChargerAllData.max_charging_current}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Power of Each Battery Slot :</b> {bulkChargerAllData.power_of_each_battery_slot}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Full load power of Each Slot :</b> {bulkChargerAllData.full_load_power_of_each_slot}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Input Impedance :</b> {bulkChargerAllData.input_impedance}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Static Voltage Regulation :</b> {bulkChargerAllData.static_voltage_regulation}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Ripple and Noise :</b> {bulkChargerAllData.ripple_and_noise}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Output Protection:</b> {bulkChargerAllData.output_protection}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Efficiency:</b> {bulkChargerAllData.efficiency}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b> Acoustic Noise:</b> {bulkChargerAllData.acoustic_noise}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark1 :</b> {bulkChargerAllData.ec_remark_1}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark2 :</b> {bulkChargerAllData.ec_remark_2}
                                </Colxx>
                              </Row>
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
                                  <Row>
                                    <Colxx md="6">
                                      <b>Operating Temp.:</b> {bulkChargerAllData.operating_temp}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Storage Temp.:</b> {bulkChargerAllData.storage_temp}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Humidity:</b> {bulkChargerAllData.humidity}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Ambient Pressure:</b> {bulkChargerAllData.ambient_pressure}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Temp. Sensor:</b> {bulkChargerAllData.temperature_sensor}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                    <b>Remark1 :</b> {bulkChargerAllData.tc_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark2 :</b> {bulkChargerAllData.tc_remark_2}
                                    </Colxx>
                                  </Row>
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
                                  <Row>
                                    <Colxx md="6">
                                      <b>Accessories:</b> {bulkChargerAllData.accessories}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Battery Door Locking:</b> {bulkChargerAllData.battery_door_locking}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Dimension:</b> {bulkChargerInfo.dimension}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Thickness:</b> {bulkChargerAllData.thickness}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Colour:</b> {bulkChargerAllData.colour}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Cable entry:</b> {bulkChargerAllData.cable_entry}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark1 :</b> {bulkChargerAllData.mc_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark2 :</b> {bulkChargerAllData.mc_remark_2}
                                    </Colxx>
                                  </Row>
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
                                <Row>
                                  <Colxx md="6">
                                    <b>Alarms:</b> {bulkChargerAllData.alarms}
                                  </Colxx>
                                  <Colxx md="6" >
                                    <b>Emergency Protection:</b> {bulkChargerAllData.emergency_protection}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Cooling:</b> {bulkChargerAllData.cooling}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>IP Rating:</b> {bulkChargerAllData.ip_rating}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Mechanical:</b> {bulkChargerAllData.mechanical}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Surge Protection:</b> {bulkChargerAllData.surge_protection}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Fire and Safety:</b> {bulkChargerAllData.fire_safety}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Smoke Detector:</b> {bulkChargerAllData.smoke_detector}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Thermal Detector:</b> {bulkChargerAllData.thermal_detector}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Fire Suppresion System:</b> {bulkChargerAllData.fire_suppresion_system}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Video Surevillance:</b> {bulkChargerAllData.video_surevillance}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Water Level Sensor:</b> {bulkChargerAllData.water_level_sensor}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Remark1 :</b> {bulkChargerAllData.p_remark_1}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Remark2 :</b> {bulkChargerAllData.p_remark_2}
                                  </Colxx>
                                </Row>
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
                                  <Row>
                                    <Colxx md="6">
                                      <b>MTBF:</b> {bulkChargerAllData.mtbf}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark1 :</b> {bulkChargerAllData.w_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark2 :</b> {bulkChargerAllData.w_remark_2}
                                    </Colxx>
                                  </Row>
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
                                  <Row>
                                    <Colxx md="6">
                                      <b>User Authentication:</b> {bulkChargerAllData.user_authentication}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Display:</b> {bulkChargerAllData.display}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Communication:</b> {bulkChargerAllData.communication}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Indication:</b> {bulkChargerAllData.indication}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Interface mode:</b> {bulkChargerAllData.interface_mode}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Identification:</b> {bulkChargerAllData.identification}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>User Interface:</b> {bulkChargerAllData.user_interface}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Network Communication:</b> {bulkChargerAllData.network_communication}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Application Use:</b> {bulkChargerAllData.application_use}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark1 :</b> {bulkChargerAllData.i_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark2 :</b> {bulkChargerAllData.i_remark_2}
                                    </Colxx>
                                  </Row>
                                </div>
                              </div>
                            </Collapse>
                          </Card>
                        </li>
                    </ul>
                  </Colxx>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" className="mt-4 mr-2" onClick={toggleInfoModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div> 
      </Row>
    </>
  );
};
export default BulkChargerMaster;
