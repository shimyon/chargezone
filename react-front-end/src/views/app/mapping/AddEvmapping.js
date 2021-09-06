import React, { useEffect, useState } from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {adminRoot,getStationsAPI,getEvInventoryByIdAPI,mapEvAPI} from '../../../constants/defaultValues';
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";

const AddEvmapping = () => {
  const [evData,setEvData] = useState([]);
  const [stationNameData,setStationNameData] = useState([]);
  const [remark1,setRemark1] = useState("");
  const [remark2,setRemark2] = useState("");
  const [selectedHub, setSelectedHub] = useState([]);

  const location = useLocation();
  const history = useHistory();
  
  let evInventoryId = 0;
  if (location.state !== null && location.state !== undefined && location.state.ev_inventory_id !== null && location.state.ev_inventory_id !== undefined) {
      evInventoryId = location.state.ev_inventory_id;
  }else{
      history.goBack();
  }
  useEffect(()=>{
    getEvInventoryByIdAPICall();
  },[]);

  //API CALLS
  const getEvInventoryByIdAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getEvInventoryByIdAPI,{ev_inventory_id:evInventoryId},
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
  //
  const submitEvData = () => {
    const currentUser = getCurrentUser();
    const postdata = {ev_inventory_id:evInventoryId,hub_id:selectedHub,remark_1:remark1,remark_2:remark2};
    axios.post(mapEvAPI,postdata,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/mapping/evmapping',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          alert(responseData.msg);
        }
    }).catch(error=>{
      console.log(error);
    })
  }
  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add EV Mapping</span>
            <a href="evmapping" className="mt-2 btn-primary default btn-sm tbl_action_btn float-right">
                <b><i className="glyph-icon simple-icon-list"></i> EV Mapping List</b>
            </a>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
              <CardBody> 
                  <Row>
                    <Colxx sm={12}>
                      <FormGroup>
                        <h5>
                        EV details
                        </h5>
                        <Row>
                          <Colxx sm={4}>
                            <b>Vehicle Vin : </b>{evData.vehicle_vin}
                          </Colxx>
                          <Colxx sm={4}>
                            <b>QR Code : </b>{evData.e_qr_code}
                          </Colxx>
                        </Row>  
                        <Separator className="mb-3" />                      
                      </FormGroup>
                    </Colxx>
                    <Colxx md={4} sm={12}>
                      <FormGroup>
                        <Label>
                        Swapping Station
                        </Label>
                        <Input type="select" name="hub_id" placeholder="Station"
                            value={selectedHub} onChange={(e)=>{setSelectedHub(e.target.value)}}>
                            <option value="0">Select Station</option>
                            {stationNameData.map((item)=>
                              <option value={item.hub_master_id} key={item.hub_master_id}>{item.name}</option>
                            )}
                          </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx md={4} sm={12}>
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
                    <Colxx md={4} sm={12}>
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
                  <Row>
                    <Colxx sm="12" className="text-center">
                      <Button color="primary" className="default mr-2" onClick={submitEvData}>
                          <b>Add</b>
                      </Button>
                      <Button color="light" className="default">
                          <b>Cancel</b>
                      </Button>
                    </Colxx>
                  </Row>
              </CardBody>
              </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default AddEvmapping;
