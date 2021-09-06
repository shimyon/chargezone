import React, { useEffect, useState } from 'react';
import { Row, Card, CardBody,
  Modal,ModalHeader, ModalBody, ModalFooter,
  Table, Button, 
  DropdownItem,DropdownMenu,DropdownToggle,
  Alert,
  UncontrolledDropdown,
  FormGroup,
  Label,
  Input,InputGroup 
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getStationsAPI,getEvInventoryByIdAPI,getEvMappingAPI,mapEvAPI} from '../../../constants/defaultValues';
import axios from 'axios';

const Evmapping = () => {
  //default values in modal
  const [evData,setEvData] = useState([]);
  const [stationNameData,setStationNameData] = useState([]);
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");
  const [selectedHub, setSelectedHub] = useState([]);
  const [updateEvMappingId,setUpdateEvMappingId] = useState(false);
  // list state
  const [evList,setEvList] = useState([]);
  const [evType,setEvType] = useState("All Ev");
  const [deleteEvMappingId,setDeleteEvMappingId] = useState(0);
  const [isUpdate,setIsUpdate] = useState(0);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  const [modalUpdateVisible,setModalUpdateVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(true);
  //alert states for update modal
  const [alertModalVisible,setAlertModalVisible] = useState(false);
  const [alertModalMsg,setAlertModalMsg] = useState("");
  const [alertModalColor,setAlertModalColor] = useState("");

  useEffect(()=>{
    getEvMappingAPICall();
  },[isUpdate,pageCount,evType]);

  //API CALLS
  const getEvMappingAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getEvMappingAPI+pageCount+"&ev_type="+evType+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setEvList(responseData.data.data);
        }else{
          console.log(responseData.msg);
          setEvList([]);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
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
  const getEvInventoryByIdAPICall = async(evInventoryId) => {
    const currentUser = getCurrentUser();
    await axios.post(getEvInventoryByIdAPI,
      {ev_inventory_id:evInventoryId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setEvData(responseData.data);
          setSelectedHub(responseData.data.hub_id);
          setRemark1(responseData.data.remark_1);
          setRemark2(responseData.data.remark_2)
        }else{
          console.log(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      });   
  }
  const mapEvAPICall = async(evMappingId,hubId,remark1,remark2) =>{
    setModalVisible(false);
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapEvAPI,
      {ev_inventory_id:evMappingId,hub_id:hubId,remark_1:remark1,remark_2:remark2},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
          const responseData = response.data;
          if (responseData.status === 1) {
            setIsUpdate(!isUpdate);
            if (hubId==0) {
              evMappingDeletedAlert(responseData.status,"EV Unmapped Successfully") 
            } else {
              evMappingDeletedAlert(responseData.status,responseData.msg) 
            }
          } else {
            evMappingDeletedAlert(responseData.status,responseData.msg)
          }
      }).catch(error=>{
        console.log(error);
      })
  }
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

  //helper methods
  //Alert helper methods
  const evMappingDeletedAlert = (status,msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    if (status === 1) {
      setAlertColor("success");
    } else {
      setAlertColor("danger");
    }              
  }
  const evModalAlert = (status,msg)=>{
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
    setRemark1(item.remark_1);
    setRemark2(item.remark_2);
    setDeleteEvMappingId(item.ev_inventory_id);
    setModalVisible(!modalVisible);
  }
  const toggleUpdateModal = (item) => {
    GetStationNamesAPICall();
    getEvInventoryByIdAPICall(item.ev_inventory_id);
    setUpdateEvMappingId(item.ev_inventory_id);
    setModalUpdateVisible(!modalUpdateVisible);
  }
  // value input handle method
  const updateEvMappingDetails = () =>{
    if (selectedHub !=0) {
      console.log("mapped");
      mapEvAPICall(updateEvMappingId,selectedHub,remark1,remark2)
    } else {
      evModalAlert(0,"Station is required");
      return;  
    } 
  }
   //handle search input
   const handleSearch = () => {
      setPageCount(1);
      getEvMappingAPICall();
  }
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">EV Mapping</span>
            <Separator className="mb-5" />
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
              <span>EV Type : </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs" data-display="static">
                  {evType}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    <DropdownItem onClick={() => {setEvType('All Ev');setPageCount(1)}}>All</DropdownItem>
                    <DropdownItem onClick={() => {setEvType('Mapped EV');setPageCount(1)}}>Mapped EV</DropdownItem>
                    <DropdownItem onClick={() => {setEvType('Unmapped EV');setPageCount(1)}}>Unmapped EV</DropdownItem>
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
          <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert} className="mb-3">
            {alertMsg}
          </Alert>
          <Card className="mb-4">
            <CardBody>
              <Table responsive bordered striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>EV Id</th>
                    <th>Swapping Station</th>
                    <th>Remark1</th>
                    <th>Remark2</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="6"><div className="custom-list-loading" /></td>
                  </tr> : 
                  (evList.length > 0)?
                    evList.map((item,index)=>
                      <tr key={item.ev_inventory_id}>
                        <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index+1}</th>
                        <td>
                            <p className="mb-0"><b>QR Code: </b>{item.e_qr_code}</p>
                            <p className="mb-0"><b>Vehicle Model: </b>{item.vehicle_model}</p>
                            <p className="mb-0"><b>Vehicle Make: </b>{item.vehicle_make}</p>
                            <p className="mb-0"><b>Vehicle Type: </b>{item.vehicle_type}</p> 
                        </td>
                        <td>{item.station_name}</td>
                        <td>{item.remark_1}</td>
                        <td>{item.remark_2}</td>
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
          Are you sure you would like to unmap this ev?
          <Button color="success" className="mt-4" onClick={()=>mapEvAPICall(deleteEvMappingId,0,remark1,remark2)}>
            Unmap
          </Button>{' '}
          <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalHeader>
      </Modal>
      <Modal
        isOpen={modalUpdateVisible}
        toggle={toggleUpdateModal} >
          <ModalHeader>
            <Row>
              <Colxx md="12" className="mt-2 text-center">
              Update details
              </Colxx>
            </Row>
          </ModalHeader>  
          <ModalBody>
            <Row>
              <Colxx md="12">
                <Alert color={alertModalColor} isOpen={alertModalVisible} toggle={()=>setAlertModalVisible(false)}>
                  {alertModalMsg}
                </Alert>
              </Colxx>
              <Colxx sm={12}>
                <FormGroup>
                  <h5>
                  EV details
                  </h5>
                  <Row>
                    <Colxx md={12}>
                      <b>Vehicle Vin : </b>{evData.vehicle_vin}
                    </Colxx>
                    <Colxx md={12}>
                      <b>QR Code : </b>{evData.e_qr_code}
                    </Colxx>
                  </Row>  
                </FormGroup>
              </Colxx>
              <Colxx md={12}>
                <FormGroup>
                  <Label>
                  Swapping Station
                  </Label>
                  <Input 
                  type="select" 
                  name="hub_id" 
                  placeholder="Station"
                  value={selectedHub} onChange={(e)=>{setSelectedHub(e.target.value)}}>
                    <option value="0">Select Station</option>
                    {stationNameData.map((item)=>
                      <option value={item.hub_master_id} key={item.hub_master_id}>{item.name}</option>
                    )}
                  </Input>
                </FormGroup>
              </Colxx>
              <Colxx md={12} sm={12}>
                <FormGroup>
                  <Label>
                  Remark1
                  </Label>
                  <Input
                    type="text"
                    placeholder="Remark1"
                    value={remark1}
                    onChange={(e)=>{setRemark1(e.target.value)}}
                  />
                </FormGroup>
              </Colxx>
              <Colxx md={12} sm={12}>
                <FormGroup>
                  <Label>
                    Remark2
                  </Label>
                  <Input
                    type="text"
                    placeholder="Remark2"
                    value={remark2}
                    onChange={(e)=>{setRemark2(e.target.value)}}
                  />
                </FormGroup>
              </Colxx>
            </Row>
          </ModalBody>
          <ModalFooter>
          <Button color="success" className="mt-4" onClick={()=>updateEvMappingDetails()}>
              Map
            </Button>{' '}
            <Button color="danger" className="mt-4 mr-2" onClick={toggleUpdateModal}>
              Cancel
            </Button>
          </ModalFooter>
      </Modal>
    </>
  );
};
export default Evmapping;
