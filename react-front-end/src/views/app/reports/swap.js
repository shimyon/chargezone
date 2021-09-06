import React,{useState,useEffect} from 'react';
import {
  Row, Card, CardBody, FormGroup, Label,
  Input, Table,Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getStationsByCityAPI,getCountriesAPI,getStatesByCountryAPI,getCitiesByStateAPI,getFleetOperatorAPI,swapReportAPI,downloadSwapReportAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

const SwapReport = ({}) => {
  //date states
  const [fromDate,setFromDate] = useState(null);
  const [toDate,setToDate] = useState(null);
  //time state
  // const [startTime,setStartTime] = useState();
  // const [endTime,setEndTime] = useState();
  //station List
  const [stationNames,setStationNames] = useState([]);
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //loader state
  const [isLoading,setIsLoading] = useState(false);
  // list state
  const [countryList,setCountryList] = useState([]);
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);
  const [fleetOpNames,setFleetOpNames] = useState([]); 
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityId,setCityId] = useState("");
  const [stationId,setStationId] = useState("");
  const [fleetOperatorId,setFleetOperatorId] = useState("");
  const [evQrCode,setEvQrCode] = useState("");
  const [report,setReport] = useState([]);

  useEffect(()=>{
    getCountryNamesAPICall();
    GetFleetOperatorAPICall();
  },[]);

  useEffect(()=>{
    GetStationNamesAPICall(countryId,stateId,cityId);
  },[countryId,stateId,cityId]);

  //API calls
  const GetStationNamesAPICall = async(country,state,city) => {
    const currentUser = getCurrentUser();
    await axios.get(getStationsByCityAPI+"country_id="+country+"&state_id="+state+"&city_id="+city,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setStationNames(responseData.data)
      }else{
        setStationNames([]);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const GetFleetOperatorAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getFleetOperatorAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
        if (responseData.status === 1) {
         setFleetOpNames(responseData.data);
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const getCountryNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getCountriesAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setCountryList(responseData.data);
        }else{
            console.log(responseData.status,responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getStateNamesAPICall = async(country) => {
    const currentUser = getCurrentUser();
    await axios.post(getStatesByCountryAPI,
      {country_id:country},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setStateList(responseData.data);
        }else{
          setStateList([]);
          setCityList([]);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getCityNamesAPICall = async(state) => {
    const currentUser = getCurrentUser();
    await axios.post(getCitiesByStateAPI,
      {state_id:state},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setCityList(responseData.data);
        }else{
          setCityList([]);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getSwapReportAPICall = async() => {
    setButtonDisabled(true);
    setReport([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    let tempFromDate,tempToDate;
    if (fromDate == null | fromDate =="") {
      tempFromDate = fromDate;
    }else{
      tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear()+" "+fromDate.getHours()+":"+fromDate.getMinutes()+":"+fromDate.getSeconds();
    }
    if (toDate == null) {
      tempToDate = toDate;
    }else{
      tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear()+" "+toDate.getHours()+":"+toDate.getMinutes()+":"+toDate.getSeconds();
    }
    const params = {
      country_id:countryId,
      state_id:stateId,
      city_id:cityId,
      hub_id:stationId,
      operator_id:fleetOperatorId,
      ev_qr_code:evQrCode,
      from_date:tempFromDate,
      to_date:tempToDate,
      page:pageCount
    }
    await axios.post(swapReportAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page)
          setReport(responseData.data.data);
        }else{
          console.log(responseData.msg);
        }
        setButtonDisabled(false);
        setIsLoading(false);
      }).catch(error=>{
        setButtonDisabled(false);
        setIsLoading(false);
        console.log(error);
      })
  }
  const downloadSwapReportAPICall = async() => {
    setButtonDisabled(true);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    let tempFromDate,tempToDate;
    if (fromDate == null | fromDate =="") {
      tempFromDate = fromDate;
    }else{
      tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear()+" "+fromDate.getHours()+":"+fromDate.getMinutes()+":"+fromDate.getSeconds();
    }
    if (toDate == null) {
      tempToDate = toDate;
    }else{
      tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear()+" "+toDate.getHours()+":"+toDate.getMinutes()+":"+toDate.getSeconds();
    }
    const params = {
      country_id:countryId,
      state_id:stateId,
      city_id:cityId,
      hub_id:stationId,
      operator_id:fleetOperatorId,
      ev_qr_code:evQrCode,
      from_date:tempFromDate,
      to_date:tempToDate,
      page:pageCount
    }
    await axios.post(downloadSwapReportAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          const link = document.createElement('a');
          link.href = responseData.data.file;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }else{
          alert(responseData.msg);
        }  
        setButtonDisabled(false);
        setIsLoading(false);
      }).catch(error=>{
        setButtonDisabled(false);
        setIsLoading(false);
        console.log(error);
      })
  }

  //helper methods
  //handle country select
  const handleCountrySelect = (country) => {
    setCountryId(country);
    setStateId("");
    setCityId("");
    setStationId("");
    getStateNamesAPICall(country);
  }
  //handle state select
  const handleStateSelect = (state) => {
    setStateId(state);
    setCityId("");
    setStationId("");
    getCityNamesAPICall(state);
  }
  //pagination method
  const handlePageChange = (index) =>{
    setPageCount(index+1)
    getSwapReportAPICall();
  }
  const renderPageList = () => {
    const pageNumbers = [];
    for (let i = 0; i <lastPageCount; i += 1) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={()=>handlePageChange(i)}>
          {i+1}
        </DropdownItem>
      );
    }
    return pageNumbers;
  };
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Swap Report</span>
        <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
            <Card>
                <CardBody>
                  <Row>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          Country
                        </Label>
                        <Input 
                        type="select"
                        name="country_id"
                        value={countryId}
                        onChange={e=>handleCountrySelect(e.target.value)}
                        >
                          <option key="" value="">All Countries</option>
                          {countryList.map((item,index)=>
                            <option key={index} value={item.id}>{item.country_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          State
                        </Label>
                        <Input 
                        type="select"
                        name="state_id"
                        value={stateId}
                        onChange={e=>handleStateSelect(e.target.value)}
                        >
                          <option key="" value="">All States</option>
                          {stateList.map((item,index)=>
                            <option key={index} value={item.id}>{item.state_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          City
                        </Label>
                        <Input 
                        type="select"
                        name="city_id"
                        value={cityId}
                        onChange={e=>{setCityId(e.target.value);setStationId("");}}
                        >
                          <option key="" value="">All Cities</option>
                          {cityList.map((item,index)=>
                            <option key={index} value={item.id}>{item.city_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          Station
                        </Label>
                        <Input 
                          type="select"
                          name="station"
                          value={stationId}
                          onChange={e=>setStationId(e.target.value)}
                        >
                          <option key="" value="">All Stations</option>
                          {stationNames.map((item,index)=>
                            <option key={index} value={item.hub_master_id}>{item.name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          Fleet Operator
                        </Label>
                        <Input 
                          type="select"
                          name="fleet_operator_id"
                          value={fleetOperatorId}
                          onChange={e=>setFleetOperatorId(e.target.value)}
                        >
                          <option key="" value="">All Fleet</option>
                          {fleetOpNames.map((item,index)=>
                            <option key={index} value={item.fleet_operator_id}>{item.name}</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          EV QR Code
                        </Label>
                        <Input 
                          type="number"
                          placeholder="EV QR Code"
                          name="ev_qr_code"
                          value={evQrCode}
                          onChange={e=>setEvQrCode(e.target.value)}
                        >
                        </Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          From Date
                        </Label>
                        <DatePicker
                        placeholderText="From Date"
                        showTimeInput
                        selected={fromDate}
                        onChange={date=>setFromDate(date)}
                        dateFormat="dd/MM/yyyy hh:mm aa"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          To Date
                        </Label>
                        <DatePicker
                        placeholderText="To Date"
                        showTimeInput
                        selected={toDate}
                        onChange={date=>setToDate(date)}
                        dateFormat="dd/MM/yyyy hh:mm aa"
                        />
                      </FormGroup>
                    </Colxx>
                    {/* <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          Start Time
                        </Label>
                        <DatePicker
                        showTimeSelect
                        placeholderText="Start Time"
                        selected={startTime}
                        onChange={date=>setStartTime(date)}
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          End Time
                        </Label>
                        <DatePicker
                        showTimeSelect
                        placeholderText="End Time"
                        selected={endTime}
                        onChange={date=>setEndTime(date)}
                        />
                      </FormGroup>
                    </Colxx> */}
                    <Colxx lg={6} sm={12}>
                      <Button color="primary" className="default mr-2" onClick={() =>{setPageCount(1);getSwapReportAPICall();}} disabled={buttonDisabled}>
                        <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Generate Report</b>
                      </Button>
                      <Button color="success" className="default" onClick={() =>{downloadSwapReportAPICall();}} disabled={buttonDisabled}>
                        <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Download Report</b>
                      </Button>
                    </Colxx>
                  </Row>
                </CardBody>
            </Card>
        </Colxx>
      </Row>
      <Row>
          <Colxx sm={12} lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <Colxx md="6">
                    <h3>Swap Report</h3>
                  </Colxx>
                  {report.length>0 &&
                    <Colxx md="6">
                      <div className="text-right mr-2 ">
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
                  }
                </Row>
                <Table responsive bordered striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Station</th>
                      <th>Operator</th>
                      <th>EV QR Code</th>
                      <th>No. Of Swap</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="5"><div className="custom-list-loading" /></td>
                      </tr> : 
                      report.length > 0 ?
                          report.map((item,index)=>
                            <tr key={index}>
                              <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                              <td>{item.station_name}</td>
                              <td>{item.operator}</td>
                              <td>{item.e_qr_code}</td>
                              <td>{item.total}</td>
                            </tr>
                          ):<tr>
                          <td className="text-center text-danger" colSpan="5">Data  Not  Found</td>
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

export default SwapReport;