import React,{useState,useEffect} from 'react';
import { 
  Row, Card, CardBody,CardSubtitle, Table, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Alert,
  Modal,ModalHeader,ModalBody,
  Input,InputGroup, 
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getBatteryInventoryListAPI,deleteBatteryInventoryAPI, adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';


const Battery = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  const [faultModalVisible,setFaultModalVisible] = useState(false);
  const [faultList,setFaultList] = useState([]);
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //battery list
  const [batteryInventoryList,setBatteryInventoryList] = useState([]);
  const [batteryInventoryID,setBatteryInventoryID] = useState("");
  const [batteryInventoryToDeleteId,setBatteryInventoryToDeleteId] = useState("");
  const [isLoading,setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getBatteryInventoryListAPICall();
    batteryInventoryAlert();
  },[batteryInventoryID,pageCount])

  //API calls
  const getBatteryInventoryListAPICall = async() => {
    setBatteryInventoryList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getBatteryInventoryListAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setBatteryInventoryList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }

  const deleteBatteryInventoryAPICall = async(batteryInventoryId) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(deleteBatteryInventoryAPI,
      {battery_inventory_id:batteryInventoryId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setBatteryInventoryID(batteryInventoryId);
          batteryInventoryDeletedAlert(responseData.status,responseData.msg)
        }else{
          batteryInventoryDeletedAlert(responseData.status,responseData.msg)
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //Helper methods
  const updateBatteryInventory = (batteryInventoryId) => {
    history.push({
      pathname:adminRoot+'/inventory/updatebattery_inventory',
      state:{battery_inventory_id:batteryInventoryId}
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
  const batteryInventoryDeletedAlert = (status,msg)=>{
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
  const batteryInventoryAlert = () =>{
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
  const toggleModal = (batteryInventoryId) => {
    setBatteryInventoryToDeleteId(batteryInventoryId)
    setModalVisible(!modalVisible);
  }
  const toggleFaultModal = (faults) => {
    setFaultList(faults)
    setFaultModalVisible(!faultModalVisible);
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getBatteryInventoryListAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Battery Inventory</span>
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
      <Row>
        <Colxx xxs="12" className="mb-4">
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
                      <th>BIN</th>
                      <th>QR Code</th>
                      <th>OEM</th>
                      <th>Model Name</th>
                      <th>Make Year</th>
                      <th>Owned By</th>
                      <th>Serial Number</th>
                      <th>IMEI</th>
                      <th>SOC</th>
                      <th>BV</th>
                      <th>Rec</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Faults</th>
                      <th>Remark</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="17"><div className="custom-list-loading" /></td>
                      </tr> : 
                         batteryInventoryList.length > 0 ?
                          batteryInventoryList.map((item,index)=>
                            <tr key={index}>
                                <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                                <td>{item.bin}</td>
                                <td>{item.b_qr_code}</td>
                                <td>{item.oem_name}</td>
                                <td>{item.model_name}</td>
                                <td>{item.make_year}</td>
                                <td>{item.owner_name}</td>
                                <td>{item.serial_number}</td>
                                <td>{item.imei}</td>
                                <td>{item.soc}</td>
                                <td>{item.bv}</td>
                                <td>{item.rec}</td>
                                <td>{item.lat}</td>
                                <td>{item.lon}</td>
                                <td>{item.total_alarm>0?
                                    <Button color="info" className="default mr-1 btn-sm tbl_action_btn" onClick={()=>{toggleFaultModal(item.alarm_list)}}>
                                      <i className="glyph-icon simple-icon-eye"></i>
                                    </Button>:"None"}</td>
                                <td>{item.remark}</td>
                                <td>
                                  <a className="btn-info default mr-1 btn-sm tbl_action_a" onClick={()=>{updateBatteryInventory(item.battery_inventory_id)}}>
                                      <i className="glyph-icon simple-icon-pencil text-white"></i>
                                  </a>
                                  <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.battery_inventory_id)}}>
                                      <i className="glyph-icon simple-icon-trash"></i>
                                  </Button>                        
                                </td>
                            </tr>
                      ):<tr>
                            <td className="text-center text-danger" colSpan="17">Data  Not  Found</td>
                        </tr>
                      }          
                  </tbody>
                </Table>
                <Modal
                  isOpen={modalVisible}
                  toggle={toggleModal} >
                  <ModalHeader className="text-center">
                    Are you sure you would like to delete this inventory?
                    <Button color="success" className="mt-4" onClick={()=>deleteBatteryInventoryAPICall(batteryInventoryToDeleteId)}>
                      Delete Inventory 
                    </Button>{' '}
                    <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                      Cancel
                    </Button>
                  </ModalHeader>
                </Modal>
                <Modal
                  isOpen={faultModalVisible}
                  toggle={toggleFaultModal} >
                  <ModalBody>
                    <h2 className="text-center">Faults</h2>
                    
                    {faultList.length>0 &&
                      faultList.map((item,index)=>
                      <Row>
                        <Colxx md="12">
                          {index+". "+item.title}
                        </Colxx>
                      </Row>)
                    }
                    <Row className="text-center">
                      <Colxx>
                        <Button color="danger" className="mt-4 mr-2" onClick={()=>setFaultModalVisible(false)}>
                          Cancel
                        </Button>
                      </Colxx>
                    </Row> 
                  </ModalBody>
                </Modal>
              </CardBody>
            </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Battery;
