import React, { useEffect, useState } from 'react';
import { 
  CardSubtitle,CardBody, 
  Row, Table, Card, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button,Input,InputGroup,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getQueueLogAPI} from '../../../constants/defaultValues';
import axios from 'axios';

const Queue = () => {
  const [transactionList,setTransactionList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");

  useEffect(()=>{
    getQueueLogAPICall();
  },[pageCount])

  //API CALLS
  const getQueueLogAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getQueueLogAPI+pageCount+`&search_param=`+searchBy,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setTransactionList(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setIsLoading(false);
      }).catch(error=>{
        console.log(error);
      })
  }
  //helper methods
  //Alert helper methods
  const queueAlert = (status,msg)=>{
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
  //handle search input
  const handleSearch = () => {
      setPageCount(1);
      getQueueLogAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Queue</span>
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
          <Card>
            <CardBody>
              <CardSubtitle className="mb-3">
                  <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                    {alertMsg}
                  </Alert>
              </CardSubtitle>
              <Table responsive striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Station</th>
                      <th>Operator</th>
                      <th>EV</th>
                      <th>DB1</th>
                      <th>CB1</th>
                      <th>DB2</th>
                      <th>CB2</th>
                      <th>OTP</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="9"><div className="custom-list-loading" /></td>
                      </tr> : 
                         transactionList.length > 0 ?
                            transactionList.map((item,index)=>
                              <tr key={item.queue_master_id}>
                                <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                                <td>{item.station_name}</td>
                                <td>{item.operator}</td>
                                <td>
                                  <p className="mb-0"><b>VehicleVIN:</b>{item.vehicle_vin}</p>
                                  <p className="mb-0"><b>Regi.No.:</b>{item.registration_no}</p>
                                </td>
                                <td>
                                    <p className="mb-0"><b>QR Code: </b>{item.discharged_b1_qr_code}</p>                          
                                </td>
                                <td>
                                    <p className="mb-0"><b>QR Code: </b>{item.charged_b1_qr_code}</p>
                                </td> 
                                <td>
                                    <p className="mb-0"><b>QR Code: </b>{item.discharged_b2_qr_code}</p> 
                                </td>
                                <td>
                                    <p className="mb-0"><b>QR Code: </b>{item.charged_b2_qr_code}</p>
                                </td>
                                <td>{item.end_otp}</td>
                              </tr>
                            ):<tr>
                                  <td className="text-center text-danger" colSpan="9">Data  Not  Found</td>
                              </tr>
                    }                            
                  </tbody>
                </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Queue;
