import React,{useState,useEffect} from 'react';
import { Row, Card, CardBody, CardSubtitle,Collapse, Table, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,InputGroup 
 } from 'reactstrap';
import {
  Colxx,
  Separator,
} from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getBatteryListAPI,deleteBatterytAPI, adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';

const BatteryMaster = ({ match }) => {
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
  //battery list
  const [batteryList,setBatteryList] = useState([]);
  const [batteryID,setBatteryID] = useState("");
  const [batteryToDeleteId,setBatteryToDeleteId] = useState("");
  //data states
  const [batteryInfo,setBatteryInfo] = useState({});
  const [batteryAllData,setBatteryAllData] = useState({});
  const [makYear,setMakeYear] = useState("");
  const [chemistry,setChemistry] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getBatteryListAPICall();
    batteryAlert();
  },[batteryID,pageCount])

  //API calls
  const getBatteryListAPICall = async() => {
    setBatteryList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getBatteryListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setBatteryList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

  const deleteBatteryAPICall = async(batteryId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteBatterytAPI,
      {battery_master_id:batteryId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setBatteryID(batteryId);
          batteryDeletedAlert(responseData.status,responseData.msg)
        }else{
          batteryDeletedAlert(responseData.status,responseData.msg)
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //Helper methods
  const updateBattery = (batteryId) => {
    history.push({
      pathname:adminRoot+'/pages/updatebattery',
      state:{battery_master_id:batteryId}
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
  const batteryDeletedAlert = (status,msg)=>{
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

  const batteryAlert = () =>{
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
  const toggleModal = (batteryId) => {
    setBatteryToDeleteId(batteryId)
    setModalVisible(!modalVisible);
  }
  //modal for all data
  const toggleInfoModal = (batteryItem) => {
    let tempAllData = {};
    if (batteryItem.all_data==undefined) {
      tempAllData = {};
    }else {
      tempAllData = JSON.parse(batteryItem.all_data);
      setMakeYear(tempAllData.make_year.month.label + tempAllData.make_year.year.label);
      setChemistry(tempAllData.chemistry);
      setBatteryInfo(batteryItem);
      setBatteryAllData(tempAllData)
    }    
    setInfoModalVisible(!infoModalVisible);
  }
   //handle search input
   const handleSearch = () => {
      setPageCount(1);
      getBatteryListAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Battery</span>
            <a href="addbattery" className="mt-2 btn-primary default btn-sm float-right">
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
                    <th>Model</th>
                    <th>Make Year</th>
                    <th>Type of Connector</th>
                    <th>Chemistry</th>
                    <th>Minimum Delivered Kwh</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="8"><div className="custom-list-loading" /></td>
                  </tr> : 
                    batteryList.length > 0 ?
                      batteryList.map((item,index)=>
                        <tr key={index}>
                          <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                          <td>{item.oem_name}</td>
                          <td>{item.model_name}</td>
                          <td>{item.make_year}</td>
                          <td>{item.type_of_connector}</td>
                          <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).chemistry.label:""}</td>
                          <td>{JSON.parse(item.all_data)!=null?JSON.parse(item.all_data).minimum_delivered:""}</td>
                          <td>
                          {item.all_data!=null && <Button color="primary" className="default mr-1 btn-sm tbl_action_btn" onClick={()=>{toggleInfoModal(item)}}>
                                <i className="glyph-icon simple-icon-eye"></i>
                            </Button>}
                            <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updateBattery(item.battery_master_id)}}>
                                <i className="glyph-icon simple-icon-pencil text-white"></i>
                            </a>
                            <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.battery_master_id)}}>
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
              <Modal
                isOpen={modalVisible}
                toggle={toggleModal} >
                <ModalHeader className="text-center">
                  Are you sure you would like to delete this battery?
                  <Button color="success" className="mt-4" onClick={()=>deleteBatteryAPICall(batteryToDeleteId)}>
                    Delete Battery 
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
                                  <b>OEM:</b> {batteryInfo.oem_name}
                                </Colxx>
                                <Colxx md="6" >
                                  <b>Model:</b> {batteryInfo.model_name}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Make Year:</b> {makYear}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Chemistry:</b> {chemistry.label}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Nominal Capacity:</b> {batteryAllData.nominal_capacity}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Minimum Capacity:</b> {batteryAllData.minimum_capacity}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>No. of cell in series:</b> {batteryAllData.series_cell}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>No. of cell in parallel:</b> {batteryAllData.parallel_cell}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                 <b> Cell Type:</b> {batteryAllData.cell_type}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Cell Make:</b> {batteryAllData.cell_make}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Total number of cells:</b> {batteryAllData.total_cells}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Nominal voltage:</b> {batteryAllData.nominal_voltage}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Minimum delivered KWH:</b> {batteryAllData.minimum_delivered}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Pack Configuration:</b> {batteryAllData.pack_configuration}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>BMS type:</b> {batteryAllData.bms_type}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                 <b> Weight:</b> {batteryAllData.weight}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Dimension:</b> {batteryAllData.dimension}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Type of Connector:</b> {batteryInfo.type_of_connector}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark 1:</b> {batteryInfo.remark_1}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark 2:</b> {batteryInfo.remark_2}
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
                                  <b>Operating voltage range:</b> {batteryAllData.operating_voltage_range}
                                </Colxx>
                                <Colxx md="6" >
                                  <b>Charging mode:</b> {batteryAllData.charging_mode}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Recommended voltage:</b> {batteryAllData.recommended_voltage}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Std. DisCh. current:</b> {batteryAllData.discharging_current}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Pulsed DisCh. Current(A):</b> {batteryAllData.pulsed_discharge_current}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Std. Charging Current(A):</b> {batteryAllData.standard_charging_current}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Cell low cut pro level:</b> {batteryAllData.cell_low_protection_level}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Cell low cut pro rec level:</b> {batteryAllData.cell_low_protection_recovery}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Cell high cut pro level:</b> {batteryAllData.cell_high_protection_level}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Cell high cut pro recovery level:</b> {batteryAllData.cell_high_protection_recovery}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery cells efficiency rate:</b> {batteryAllData.battery_cells_efficiency}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery cells failure rate:</b> {batteryAllData.battery_cells_faliure}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery pack effi rate:</b> {batteryAllData.battery_pack_efficiency}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Battery pack failure rate:</b> {batteryAllData.battery_pack_faliure}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Bleeding start voltage level:</b> {batteryAllData.bleeding_start_voltage}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Over Temp. pro DisCh.mode:</b> {batteryAllData.over_temp_pro_dis}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Temp. pro rec DisCh.mode:</b> {batteryAllData.over_temp_recovery_dis}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Temp. pro charge mode:</b> {batteryAllData.over_temp_pro_charge}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Temp. pro rec charge mode:</b> {batteryAllData.over_temp_recovery_charge}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark 1:</b> {batteryAllData.ec_remark_1}
                                </Colxx>
                                <Colxx md="6" className="mt-2"> 
                                  <b>Remark 2:</b> {batteryAllData.ec_remark_2}
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
                                      <b>Max. Working Temp.:</b> {batteryAllData.max_working_temp}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Storage Temp.:</b> {batteryAllData.storage_temp}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Temp. control at cell level:</b> {batteryAllData.temp_control_cell}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Temp. control at pack level:</b> {batteryAllData.temp_control_pack}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Temp. control at swap. level:</b> {batteryAllData.temp_control_swapping}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 1:</b> {batteryAllData.tc_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 2:</b> {batteryAllData.tc_remark_2}
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
                                      <b>Module dimension:</b> {batteryAllData.module_dimension}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Cabinet design:</b> {batteryAllData.cabinet_design}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Degradation of sensors/connectors:</b> {batteryAllData.degradation_sensors}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Power connector:</b> {batteryAllData.power_connector}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>RS485/CAN:</b> {batteryAllData.rs_can}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Casing:</b> {batteryAllData.casing}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 1:</b> {batteryAllData.mc_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 2:</b> {batteryAllData.mc_remark_2}
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
                                    <b>Cell over voltage pro:</b> {batteryAllData.cell_over_voltage}
                                  </Colxx>
                                  <Colxx md="6" >
                                    <b>Cell under voltage pro:</b> {batteryAllData.cell_under_voltage}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Ch. ov. current pro:</b> {batteryAllData.charging_over_current}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>DisCh. ov. current pro:</b> {batteryAllData.discharging_over_current}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Output short circuit pro:</b> {batteryAllData.output_short_circuit}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Cell Temp Pro. in DisCh.:</b> {batteryAllData.cell_temp_protection_discharging}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Remark 1:</b> {batteryAllData.p_remark_1}
                                  </Colxx>
                                  <Colxx md="6" className="mt-2"> 
                                    <b>Remark 2:</b> {batteryAllData.p_remark_2}
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
                                      <b>Cycle Life:</b> {batteryAllData.cycle_life}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Capacity Retention of 70%:</b> {batteryAllData.capacity_retention}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Depth of DisCh.:</b> {batteryAllData.depth_discharge}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 1:</b> {batteryAllData.w_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 2:</b> {batteryAllData.w_remark_2}
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
                                      <b>Communication Prototcol:</b> {batteryAllData.communication_prototcol}
                                    </Colxx>
                                    <Colxx md="6" >
                                      <b>Network Communication:</b> {batteryAllData.network_communication}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 1:</b> {batteryAllData.i_remark_1}
                                    </Colxx>
                                    <Colxx md="6" className="mt-2"> 
                                      <b>Remark 2:</b> {batteryAllData.i_remark_2}
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
export default BatteryMaster;