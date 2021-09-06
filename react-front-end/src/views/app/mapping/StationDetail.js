import React, { useEffect, useState } from 'react';
import { 
  Card, CardBody, 
  CardHeader, CardTitle,
  FormGroup,
  Alert,
  Row, Button, Input,Table,
  Modal,ModalHeader
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getFleetOperatorMappingListAPI,getUserMappingListByRoleAPI,mapFleetOperatorAPI,mapByRoleAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {Formik} from 'formik';
import * as yup from 'yup';

const StationDetail = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  const [unmapAlertVisible,setUnmapAlertVisible] = useState(false);
  //Modal States
  const [modalVisible,setModalVisible] = useState(false);
  //flag to dislpay list
  const [listFlag,setListFlag] = useState(0);
  //button selected
  const [fleetOutline,setFleetOutline] = useState(false); //if outline false then button selected
  const [operatorOutline,setOperatorOutline] = useState(true);
  const [managerOutline,setManagerOutline] = useState(true);
  //user role
  const [userRole,setUserRole] = useState("Fleet Operator");
  //fleet/operator/manager id to map
  const [mappingId,setMappingId] = useState("0");
  //fleet/operator/manager id to Unmap
  const [unmapId,setUnmapId] = useState("");
   //map-unmap list
   const [mappedList,setMappedList] = useState([]);
   const [unmappedList,setUnmappedList] = useState([]);
   //set id for unmap
   const [isUpdate,setIsUpdate] = useState(false);

   const location = useLocation();

   useEffect(()=>{
    getMappingListByRoleAPICall();
  },[isUpdate,userRole])

  //API calls
  const getMappingListByRoleAPICall = async() => {
    setMappedList([]);
    setUnmappedList([]);
    switch (userRole) {
      case "Fleet Operator":
        getFleetOperatorMappingListAPICall();
        break;
      case "Operator":
        getOperatorMappingListAPICall();
        break;
      case "Manager":
      getManagerMappingListAPICall();
      break;
      default:
        getFleetOperatorMappingListAPICall();
        break;
    }
  }
  const getFleetOperatorMappingListAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getFleetOperatorMappingListAPI,
      {hub_id:location.state.hub_id},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setMappedList(responseData.data.mapped_fleet_operator);
          setUnmappedList(responseData.data.other_fleet_operator);
          if (responseData.data.mapped_fleet_operator.length>0) {
            setListFlag(responseData.status);
          }else{
            setListFlag(0);
          }
        }else{
          setListFlag(responseData.status);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getOperatorMappingListAPICall = async() => {
    setMappedList([]);
    const currentUser = getCurrentUser();
    await axios.post(getUserMappingListByRoleAPI,
      {user_role:"Operator",hub_id:location.state.hub_id},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setMappedList(responseData.data.mapped_user);
          setUnmappedList(responseData.data.other_user);
          if (responseData.data.mapped_user.length>0) {
            setListFlag(responseData.status);
          }else{
            setListFlag(0);
          }
        }else{
          setListFlag(responseData.status);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getManagerMappingListAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getUserMappingListByRoleAPI,
      {user_role:"Manager",hub_id:location.state.hub_id},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setMappedList(responseData.data.mapped_user);
          setUnmappedList(responseData.data.other_user);
          if (responseData.data.mapped_user.length>0) {
            setListFlag(responseData.status);
          }else{
            setListFlag(0);
          }
        }else{
          setListFlag(responseData.status);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const MapByRoleAPICall = async(stationId,idToMap,mapstate) => {
    switch (userRole) {
      case "Fleet Operator":
        MapStationWithFleetAPICall(stationId,idToMap,mapstate);
        break;
      case "Operator":
        MapStationWithOperatorAPICall(stationId,idToMap,mapstate);
        break;
      case "Manager":
      MapStationWithManagerAPICall(stationId,idToMap,mapstate);
      break;
    }
  }
  const MapStationWithFleetAPICall = async(stationId,fleetId,mapstate) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapFleetOperatorAPI,
      {hub_id:stationId,fleet_operator_id:fleetId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setIsUpdate(!isUpdate);
          if (mapstate==1) {
            mapAlert(responseData.status,responseData.msg);
          }else{
            unMapAlert(responseData.status,"Station Unmapped Successfully");
          }
        }else{
          mapAlert(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const MapStationWithOperatorAPICall = async(stationId,userId,mapstate) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapByRoleAPI,
      {hub_id:stationId,user_id:userId,user_role:"Operator"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setIsUpdate(!isUpdate);
          if (mapstate==1) {
            mapAlert(responseData.status,responseData.msg);
          }else{
            unMapAlert(responseData.status,"Unmapped Successfully");
          }
        }else{
          mapAlert(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const MapStationWithManagerAPICall = async(stationId,userId,mapstate) =>{
    setModalVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(mapByRoleAPI,
      {hub_id:stationId,user_id:userId,user_role:"Manager"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setIsUpdate(!isUpdate);
          if (mapstate==1) {
            mapAlert(responseData.status,responseData.msg);
          }else{
            unMapAlert(responseData.status," Unmapped Successfully");
          }
        }else{
          mapAlert(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const mapAlert = (status,msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    if (status === 1) {
      setAlertColor("success");
    } else {
      setAlertColor("danger");
    }
  }
  const unMapAlert = (status,msg)=>{
    setUnmapAlertVisible(true);
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
  //Modal helper methods
  const toggleModal = (unMapID) => {
    setUnmapId(unMapID);
    setModalVisible(!modalVisible);
  }
  //display details method
  const sortDetail = (hubName,name) => {
    if (hubName == null || hubName == "") {
      return name;
    } else {
      return name+" - "+hubName;
    }
  }
  //map method
  const handleMap = (id) => {
    if (id == 0) {
      mapAlert(0,"Please select "+userRole)
      return;
    } else {
      MapByRoleAPICall(location.state.hub_id,id,1);
    }
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Station Mapping</span>
            <a href="station" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon iconsminds-arrow-back-3"></i> Go Back</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs={12} className="mb-2">
          <Card>
            <CardBody>
              <Row>
                <Colxx md="6">
                  <Button 
                    outline={fleetOutline} 
                    color="primary" 
                    className="default" 
                    onClick={()=>{
                      setFleetOutline(false);
                      setOperatorOutline(true);
                      setManagerOutline(true);
                      setUserRole("Fleet Operator")
                      }}>
                      <b>Fleet Operator</b>
                  </Button>
                  <Button 
                    outline={operatorOutline} 
                    color="primary" 
                    className="default" 
                    onClick={()=>{
                      setFleetOutline(true);
                      setOperatorOutline(false);
                      setManagerOutline(true);
                      setUserRole("Operator")}}>
                    <b>Operator</b>
                  </Button>
                  <Button 
                    outline={managerOutline} 
                    color="primary" 
                    className="default" 
                    onClick={()=>{
                      setFleetOutline(true);
                      setOperatorOutline(true);
                      setManagerOutline(false);
                      setUserRole("Manager")}}>
                    <b>Manager</b>
                  </Button>
                </Colxx>
              </Row>
              <Row>
                <Colxx md="6 mt-5 ">
                    <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                      {alertMsg}
                    </Alert>
                  </Colxx>                  
                  <Colxx md="12">
                    <h4 className="mb-3">Select {userRole}</h4>
                  </Colxx>   
              </Row>
              <Row className="mb-4">
                <Colxx md={6}>
                  <FormGroup>
                  <Input 
                    type="select" 
                    name="id"
                    onChange={(e)=>setMappingId(e.target.value)}
                  >
                    <option key={0} value={0}>Select</option>
                    {
                      userRole=="Operator"|| userRole==="Manager"?
                      unmappedList.map((item,i)=>
                        <option key={i} value={item.id}>{sortDetail(item.station_name,item.name)}</option>
                      ):
                      unmappedList.map((item,i)=>
                        <option key={i} value={item.fleet_operator_id}>{sortDetail(item.hub_name,item.name)}</option>
                      )
                    }
                  </Input>
                  </FormGroup>
                </Colxx>
                <Colxx md="6">
                  <Button 
                  color="primary" 
                  className="default"
                  onClick={()=>handleMap(mappingId)}>
                      <b>Save</b>
                  </Button>
                </Colxx>
              </Row> 
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs={12}>
          <Card>
            <CardBody>
              <CardHeader className="mb-3">
                <Alert color={alertColor} isOpen={unmapAlertVisible} toggle={()=>setUnmapAlertVisible(false)}>
                  {alertMsg}
                </Alert>
              </CardHeader>
              <h4>Mapping Details</h4>
                  {
                    //check role
                    userRole=="Operator"|| userRole=="Manager"?
                      <Table responsive bordered striped>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listFlag>0?
                            mappedList.map((item,index)=>
                            <tr key={index}>
                            <th scope="row">{index +1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contact_number}</td>
                            <td>
                              <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.id)}}>
                                  <i className="glyph-icon simple-icon-trash"></i>
                              </Button>
                            </td>
                          </tr>
                          ):
                          <tr>
                            <td className="text-center text-danger" colSpan="5">Data  Not  Found</td>
                          </tr>}
                        </tbody>
                      </Table>:
                      <Table responsive bordered striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Fleet Id</th>
                          <th>Address</th>
                          <th>Contact Person</th>
                          <th>Contact Email</th>
                          <th>Contact Number</th>
                          <th>Remark 2</th>
                          <th>Remark 2</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listFlag>0?
                          mappedList.map((item,index)=>
                          <tr key={index}>
                          <th scope="row">{index +1}</th>
                          <td>{item.name}</td>
                          <td>{item.fleet_id}</td>
                          <td>{item.address}</td>
                          <td>{item.contact_person}</td>
                          <td>{item.contact_email}</td>
                          <td>{item.contact_number}</td>
                          <td>{item.remark_1}</td>
                          <td>{item.remark_2}</td>
                          <td>
                            <Button color="danger" className="default btn-sm tbl_action_btn" onClick={()=>{toggleModal(item.fleet_operator_id)}}>
                                <i className="glyph-icon simple-icon-trash"></i>
                            </Button>
                          </td>
                        </tr>
                        ):
                        <tr>
                          <td className="text-center text-danger" colSpan="10">Data  Not  Found</td>
                        </tr>}
                      </tbody>
                    </Table>
                  }
              <Modal
                isOpen={modalVisible}
                toggle={toggleModal} >
                <ModalHeader className="text-center">
                  <Row>
                    <Colxx md="12">
                      Are you sure you would like to unmap this ?
                    </Colxx>
                    <Colxx md="12">
                      <Button color="success" className="mt-4" onClick={()=>MapByRoleAPICall(0,unmapId,0)}>
                        Unmap 
                      </Button>{' '}
                      <Button color="danger" className="mt-4 mr-2" onClick={toggleModal}>
                        Cancel
                      </Button>
                    </Colxx>
                  </Row>
                </ModalHeader>
              </Modal>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default StationDetail; 