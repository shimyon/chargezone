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
import {getStationsAPI,getChargerMappingAPI,mapChargerAPI} from '../../../constants/defaultValues';
import axios from 'axios';

const Chargermapping = () => {
  //states
  const [chargerMappingList,setChargerMappingList] = useState([]);
  const [chargerType,setChargerType] = useState("All Charger");
  const [deleteChargerId,setDeleteChargerId] = useState("");
  const [updateChargerId,setUpdateChargerId] = useState(false);
  const [isUpdate,setIsUpdate] = useState(0);
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");
  //dropdown states
  const [stationNameData,setStationNameData] = useState([]);
  const [stationId,setStationId] = useState("");
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //alert states for update modal
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
    getChargerMappingAPICall();
  },[isUpdate,pageCount,chargerType]);

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
  const getChargerMappingAPICall = async() => {
    setChargerMappingList([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getChargerMappingAPI+pageCount+"&charger_type="+chargerType+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setChargerMappingList(responseData.data.data);
        }else{
          setLastPageCount(pageCount);
          setChargerMappingList([]);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  const mapChargerAPICall = async(chargerId,hubId,remark1,remark2) =>{
    setModalVisible(false);
    setModalUpdateVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapChargerAPI,
      {charger_inventory_id:chargerId,hub_id:hubId,remark_1:remark1,remark_2:remark2},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
          const responseData = response.data;
          if (responseData.status === 1) {
            setIsUpdate(!isUpdate);
            if (hubId==0) {
              chargerDeletedAlert(responseData.status,"Charger Unmapped Successfully") 
            } else {
              chargerDeletedAlert(responseData.status,responseData.msg) 
            }
          }else{
            chargerDeletedAlert(responseData.status,responseData.msg)
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
  const chargerDeletedAlert = (status,msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    if (status === 1) {
      setAlertColor("success");
    } else {
      setAlertColor("danger");
    }              
  }
  const chargerModalAlert = (status,msg)=>{
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
    setDeleteChargerId(item.id);
    setModalVisible(!modalVisible);
  }
  const toggleUpdateModal = (item) => {
    GetStationNamesAPICall();
    setStationId(item.hub_id);
    setRemark1(item.remark_1);
    setRemark2(item.remark_2);
    setUpdateChargerId(item.id);
    setModalUpdateVisible(!modalUpdateVisible);
  }
  // value input handle method
  const updateChargerMappingDetails = () =>{
    if (stationId !=0) {
      mapChargerAPICall(updateChargerId,stationId,remark1,remark2)
    } else {
      chargerModalAlert(0,"Station is required");
      return;  
    } 
  }
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getChargerMappingAPICall();
  }
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Charger Mapping</span>
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
              <span>Charger Type : </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-primary" size="xs" data-display="static">
                  {chargerType}
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    <DropdownItem onClick={() => {setChargerType('All Charger');setPageCount(1)}}>All</DropdownItem>
                    <DropdownItem onClick={() => {setChargerType('Mapped Charger');setPageCount(1)}}>Mapped Charger</DropdownItem>
                    <DropdownItem onClick={() => {setChargerType('Unmapped Charger');setPageCount(1)}}>Unmapped Charger</DropdownItem>
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
                    <th>Charger Name</th>
                    <th>Charger Id </th>
                    <th>Swapping Station</th>
                    <th>Remark 1</th>
                    <th>Remark 2</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ?
                  <tr>
                      <td className="text-center" colSpan="7"><div className="custom-list-loading" /></td>
                  </tr> : 
                    (chargerMappingList.length > 0)?
                        chargerMappingList.map((item,index)=>
                          <tr key={item.id}>
                            <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                            <td>
                                <p className="mb-0"><b>QR Code: </b>{item.qr_code}</p>
                                <p className="mb-0"><b>No of Slot: </b>{item.no_of_slot}</p> 
                                <p className="mb-0"><b>Make: </b>{item.make}</p>
                                <p className="mb-0"><b>Model: </b>{item.model}</p>
                                <p className="mb-0"><b>Dimension: </b>{item.dimension}</p>
                                <p className="mb-0"><b>Owner Name: </b>{item.owner_name}</p>  
                            </td>
                            <td>{item.charger_id}</td>
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
                            <td className="text-center text-danger" colSpan="7">Data  Not  Found</td>
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
              Are you sure you would like to unmap this?
            </Colxx>
            <Colxx md="12">
              <Button color="success" className="mt-4" onClick={()=>mapChargerAPICall(deleteChargerId,0,remark1,remark2)}>
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
                  onChange={e=>setStationId(e.target.value)}
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
                    Remark 1
                  </Label>
                  <Input
                  type="text"
                  placeholder="Remark 1"
                  name="remark_1"
                  value={remark1}
                  onChange={e=>setRemark1(e.target.value)}
                  />
                </FormGroup>
              </Colxx>
              <Colxx md="12">
                <FormGroup>
                  <Label>
                    Remark 2
                  </Label>
                  <Input
                  type="text"
                  placeholder="Remark 2"
                  name="remark_2"
                  value={remark2}
                  onChange={e=>setRemark2(e.target.value)}
                  />
                </FormGroup>
              </Colxx>
            </Row>
          </ModalBody>
          <ModalFooter>
          <Button color="success" className="mt-4" onClick={()=>updateChargerMappingDetails()}>
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
export default Chargermapping;
