import React, { useEffect, useState } from 'react';
import { Row, FormGroup,Label,Input,
  Card, CardBody,CardSubtitle,
  Modal, ModalHeader, ModalBody, ModalFooter, 
  Table, Button, DropdownItem,
  DropdownMenu,
  DropdownToggle,Alert,
  UncontrolledDropdown,
  InputGroup
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getStationsAPI,getEvInventoryByStationAPI,getBatteryMappingAPI,mapBatteryAPI} from '../../../constants/defaultValues';
import axios from 'axios';

const Batterymapping = () => {
  //states
  const [batteryMappingList,setBatteryMappingList] = useState([]);
  const [batteryType,setBatteryType] = useState("All Battery");
  const [deleteBatteryId,setDeleteBatteryId] = useState("");
  const [updateBatteryId,setUpdateBatteryId] = useState("");
  const [isUpdate,setIsUpdate] = useState(false);
  const [remark,setRemark] = useState("");
  //dropdown states
  const [stationNameData,setStationNameData] = useState([]);
  const [stationId,setStationId] = useState("");
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  const [alertModalVisible,setAlertModalVisible] = useState(false);
  const [alertModalMsg,setAlertModalMsg] = useState("");
  const [alertModalColor,setAlertModalColor] = useState("");
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  const [modalUpdateVisible,setModalUpdateVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    getBatteryMappingAPICall();
  },[isUpdate,pageCount,batteryType]);

  //API CALLS
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
  const getBatteryMappingAPICall = async() => {
    setBatteryMappingList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getBatteryMappingAPI+pageCount+"&battery_type="+batteryType+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setBatteryMappingList(responseData.data.data);
        }else{
          setLastPageCount(pageCount);
          setBatteryMappingList([]);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  const mapBatteryAPICall = async(batteryId,hubId,remark) =>{
    setModalVisible(false);
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapBatteryAPI,
      {battery_inventory_id:batteryId,ev_inventory_id:0,hub_id:hubId,remark:remark},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
          const responseData = response.data;
          if (responseData.status === 1) {
            setIsUpdate(!isUpdate);
            if (hubId==0) {
              batteryDeletedAlert(responseData.status,"Battery Unmapped Successfully") 
            } else {
              batteryDeletedAlert(responseData.status,responseData.msg) 
            }
          }else{
            batteryDeletedAlert(responseData.status,responseData.msg)
          }
          
      }).catch(error=>{
        console.log(error);
      })
  }
  //helper methods
  //pagination method
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
  const batteryModalAlert = (status,msg)=>{
    setAlertModalVisible(true);
    setAlertModalMsg(msg);
    if (status === 1) {
      setAlertModalColor("success");
    } else {
      setAlertModalColor("danger");
    }              
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Modal helper methods
  const toggleModal = (item) => {
    setRemark(item.remark)
    setDeleteBatteryId(item.battery_inventory_id);
    setModalVisible(!modalVisible);
  }
  const toggleUpdateModal = (item) => {
    GetStationNamesAPICall();
    setStationId(item.hub_id);
    setRemark(item.remark); 
    setUpdateBatteryId(item.battery_inventory_id);
    setModalUpdateVisible(!modalUpdateVisible);
  }
  // value imput handle method
  //station
  const handleStationChange = (e) => {
      setStationId(e.target.value);
  }
  const updateBatteryMappingDetails = () =>{
    if (stationId !=0) {
      mapBatteryAPICall(updateBatteryId,stationId,remark)
    } else {
      batteryModalAlert(0,"Station is required");
      return;  
    } 
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getBatteryMappingAPICall();
  }
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Battery Mapping</span>
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
              <span>Battery Type : </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs" data-display="static">
                  {batteryType}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    <DropdownItem onClick={() => {setBatteryType('All Battery');setPageCount(1)}}>All</DropdownItem>
                    <DropdownItem onClick={() => {setBatteryType('Mapped Battery');setPageCount(1)}}>Mapped Battery</DropdownItem>
                    <DropdownItem onClick={() => {setBatteryType('Unmapped Battery');setPageCount(1)}}>Unmapped Battery</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <span className="ml-5">Page </span>
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
                    <th>Battery Name</th>
                    <th>EV Id</th>
                    <th>Swapping Station</th>
                    <th>Remark</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="6"><div className="custom-list-loading" /></td>
                  </tr> : 
                    (batteryMappingList.length > 0)?
                        batteryMappingList.map((item,index)=>
                          <tr key={item.battery_inventory_id}>
                            <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                            <td>
                                <p className="mb-0"><b>QR Code: </b>{item.b_qr_code}</p>
                                <p className="mb-0"><b>Serial No: </b>{item.serial_number}</p>
                                <p className="mb-0"><b>BIN: </b>{item.bin}</p>
                                <p className="mb-0"><b>SOC: </b>{item.soc}</p> 
                            </td>
                            <td>{item.ev_inventory_id}</td>
                            <td>{item.station_name}</td>
                            <td>{item.remark}</td>
                            <td>
                              <Button color="info" className="default mr-1 btn-sm tbl_action_btn" onClick={()=>toggleUpdateModal(item)}>
                                  <i className="glyph-icon simple-icon-pencil"></i>
                              </Button>
                              {(item.hub_id > 0) && 
                              <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item)}}>
                                  <i className="glyph-icon simple-icon-trash"></i>
                              </Button>}
                              
                            </td>
                          </tr>
                        ):<tr>
                            <td className="text-center text-danger" colSpan="6">Data  Not  Found</td>
                        </tr>
                      }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Modal
        isOpen={modalVisible}
        toggle={toggleModal} >
        <ModalHeader className="text-center">
          <Row>
            <Colxx md="12">
              Are you sure you would like to delete this?
            </Colxx>
            <Colxx md="12">
              <Button color="success" className="mt-4" onClick={()=>mapBatteryAPICall(deleteBatteryId,0,remark)}>
                Unmap 
              </Button>{' '}
              <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                Cancel
              </Button>
            </Colxx>
          </Row>
        </ModalHeader>
      </Modal>
      <Modal
        isOpen={modalUpdateVisible}
        toggle={toggleUpdateModal} >
          <ModalHeader>
            Update
          </ModalHeader>  
          <ModalBody>
            <Row>
              <Colxx md="12">
                <Alert color={alertModalColor} isOpen={alertModalVisible} toggle={()=>setAlertModalVisible(false)}>
                  {alertModalMsg}
                </Alert>
              </Colxx>
              <Colxx md="12">
                <FormGroup>
                  <Label>
                    Swapping Station
                  </Label>
                  <Input
                  type="select"
                  placeholder="Select"
                  name="hub_id"
                  value={stationId}
                  onChange={e=>handleStationChange(e)}
                  >
                    <option value={0} key={0}>Select Station</option>
                    {stationNameData.map((item)=>
                      <option value={item.hub_master_id} key={item.hub_master_id}>{item.name}</option>
                    )}
                  </Input>
                </FormGroup>
              </Colxx>
              <Colxx md="12">
                  <FormGroup>
                    <Label>
                      Remark
                    </Label>
                    <Input
                    type="text"
                    placeholder="Remark"
                    name="remark"
                    value={remark}
                    onChange={e=>setRemark(e.target.value)}
                    />
                  </FormGroup>
                </Colxx>
            </Row>
          </ModalBody>
          <ModalFooter>
          <Button color="success" className="mt-4" onClick={()=>updateBatteryMappingDetails()}>
              Update
            </Button>{' '}
            <Button color="danger" className="mt-4 mr-2" onClick={toggleUpdateModal}>
              Cancel
            </Button>
          </ModalFooter>
      </Modal>
    </>
  );
};
export default Batterymapping;
