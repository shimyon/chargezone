import React, { useEffect, useState } from 'react';
import { 
  CardSubtitle,CardBody, 
  Row, Table, Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input,InputGroup,Button,
  Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getCurrentUser} from '../../../helpers/Utils';
import {getTransactionAPI} from '../../../constants/defaultValues';
import axios from 'axios';

const Transaction = () => {
  const [transactionList,setTransactionList] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  //search state
  const [searchBy,setSearchBy] = useState("");
  //Pagination states
  const [pageCount,setPageCount] = useState("1");  
  const [lastPageCount,setLastPageCount] = useState("1");
  const status_val = ['-','Scan EV','Scan DB1','Scan DB2','Scan OTP','Scan EV','Scan CB1','Scan CB2']
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");

  useEffect(()=>{
    getTransactionAPICall();
  },[pageCount])

  //API CALLS
  const getTransactionAPICall = async() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.get(getTransactionAPI+pageCount+`&search_param=`+searchBy,
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
  const transactionAlert = (status,msg)=>{
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
      getTransactionAPICall();
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Transactions</span>
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
                      <th>Status</th>
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
                          <td className="text-center" colSpan="10"><div className="custom-list-loading" /></td>
                      </tr> : 
                         transactionList.length > 0 ?
                            transactionList.map((item,index)=>
                              <tr key={item.transaction_log_id}>
                                <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                                <td>{status_val[item.status]}</td>
                                <td>{item.station_name}</td>
                                <td>{item.operator}</td>
                                <td><b>Vehicle VIN : </b>{item.vehicle_vin}</td>
                                <td>
                                    <p className="mb-0"><b>BIN:</b>{item.discharged_battery_bin_1}</p>
                                    <p className="mb-0"><b>SOC:</b>{item.discharged_battery_soc_1}</p>
                                    <p className="mb-0"><b>BV:</b>{item.discharged_battery_bv_1}</p>
                                    <p className="mb-0"><b>REC:</b>{item.discharged_battery_rec_1}</p>                           
                                </td>
                                <td>
                                    <p className="mb-0"><b>BIN:</b>{item.charged_battery_bin_1}</p>
                                    <p className="mb-0"><b>SOC:</b>{item.charged_battery_soc_1}</p>
                                    <p className="mb-0"><b>BV:</b>{item.charged_battery_bv_1}</p>
                                    <p className="mb-0"><b>REC:</b>{item.charged_battery_rec_1}</p>
                                </td> 
                                <td>
                                    <p className="mb-0"><b>BIN:</b>{item.discharged_battery_bin_2}</p>
                                    <p className="mb-0"><b>SOC:</b>{item.discharged_battery_soc_2}</p>
                                    <p className="mb-0"><b>BV:</b>{item.discharged_battery_bv_2}</p>
                                    <p className="mb-0"><b>REC:</b>{item.discharged_battery_rec_2}</p> 
                                </td>
                                <td>
                                    <p className="mb-0"><b>BIN:</b>{item.charged_battery_bin_2}</p>
                                    <p className="mb-0"><b>SOC:</b>{item.charged_battery_soc_2}</p>
                                    <p className="mb-0"><b>BV:</b>{item.charged_battery_bv_2}</p>
                                    <p className="mb-0"><b>REC:</b>{item.charged_battery_rec_2}</p>
                                </td>
                                <td>{item.end_otp}</td>
                              </tr>
                            ):<tr>
                                  <td className="text-center text-danger" colSpan="10">Data  Not  Found</td>
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

export default Transaction;
