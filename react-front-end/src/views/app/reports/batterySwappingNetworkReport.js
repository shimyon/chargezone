import React,{useState,useEffect} from 'react';
import {
  Row, Card, CardBody,  
  FormGroup, Label,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Input, Table,Button
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getCountriesAPI,getStatesByCountryAPI,getCitiesByStateAPI,getStationsByCityAPI,bsnReportAPI,downloadBsnReportAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';

const BatterySwappingNetworkReport = ({}) => {
  //date states
  const [fromDate,setFromDate] = useState(null);
  const [toDate,setToDate] = useState(null);
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
  const [report,setReport] = useState([]);
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityId,setCityId] = useState("");
  const [stationId,setStationId] = useState("");

  useEffect(()=>{
    getCountryNamesAPICall();
  },[]);

  useEffect(()=>{
    GetStationNamesAPICall(countryId,stateId,cityId);
  },[countryId,stateId,cityId])

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
  const getCountryNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getCountriesAPI,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
            setCountryList(responseData.data);
        }else{
            console.log("coutries",responseData.status,responseData.msg);
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
          setStationNames([]);
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
          setStationNames([]);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getBSNReportAPICall = async() => {
    setButtonDisabled(true);
    setReport([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    // let tempFromDate,tempToDate;
    // if (fromDate == null | fromDate =="") {
    //   tempFromDate = fromDate;
    // }else{
    //   tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear();
    // }
    // if (toDate == null) {
    //   tempToDate = toDate;
    // }else{
    //   tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear();
    // }
    const params = {
      country_id:countryId,
      state_id:stateId,
      city_id:cityId,
      hub_id:stationId,
      // from_date:tempFromDate,
      // to_date:tempToDate,
      page:pageCount
    }
    
    await axios.post(bsnReportAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page);
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
  const downloadBSNReportAPICall = async() => {
    setButtonDisabled(true);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    const params = {
      country_id:countryId,
      state_id:stateId,
      city_id:cityId,
      hub_id:stationId,
    }
    
    await axios.post(downloadBsnReportAPI,
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
  //handle city select
  const handleCitySelect = (city) => {
    setCityId(city);
    setStationId("");
  }
  //pagination method
  const handlePageChange = (index) =>{
    setPageCount(index+1)
    getBSNReportAPICall();
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
        <span className="page_title">Battery Swapping Network Report</span>
        <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
          <Colxx xxs="12" className="mb-4">
              <Card>
                  <CardBody>
                    <Row>
                      <Colxx lg={2} sm={12}>
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
                      <Colxx lg={2} sm={12}>
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
                      <Colxx lg={2} sm={12}>
                        <FormGroup>
                          <Label>
                            City
                          </Label>
                          <Input 
                          type="select"
                          name="city_id"
                          value={cityId}
                          onChange={e=>handleCitySelect(e.target.value)}
                          >
                            <option key="" value="">All Cities</option>
                            {cityList.map((item,index)=>
                              <option key={index} value={item.id}>{item.city_name}</option>
                            )}
                          </Input>
                        </FormGroup>
                      </Colxx>
                      <Colxx lg={2} sm={12}>
                        <FormGroup>
                          <Label>
                            Station
                          </Label>
                          <Input 
                          type="select"
                          name="station"
                          value={stationId}
                          onChange={e=> setStationId(e.target.value)}>
                            <option key="" value="">All Station</option>
                            {stationNames.map((item,index)=>
                              <option key={index} value={item.hub_master_id}>{item.name}</option>
                            )}
                          </Input>
                        </FormGroup>
                      </Colxx>
                      {/* <Colxx lg={3} sm={12}>
                        <FormGroup>
                          <Label>
                            From Date
                          </Label>
                          <DatePicker
                          placeholderText="From Date"
                          selected={fromDate}
                          onChange={date=>setFromDate(date)}
                          dateFormat="dd/MM/yyyy"
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
                          selected={toDate}
                          onChange={date=>setToDate(date)}
                          dateFormat="dd/MM/yyyy"
                          />
                        </FormGroup>
                      </Colxx> */}
                      <Colxx  lg={2} sm={12}>
                        <Button color="primary" className="default mt-4 custom_btn" onClick={() =>{setPageCount(1);getBSNReportAPICall();}} disabled={buttonDisabled}>
                          <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Generate Report</b>
                        </Button>
                      </Colxx>
                      <Colxx  lg={2} sm={12}>
                        <Button color="success" className="default mt-4 custom_btn" onClick={() =>{downloadBSNReportAPICall();}} disabled={buttonDisabled}>
                          <i className="glyph-icon simple-icon-download font-weight-bold"></i> <b>Download Report</b>
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
                    <h3>Battery Swapping Network Report Detail</h3>
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
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Station</th>
                      <th>Total No. of EV</th>
                      <th>Total No. of Charger</th>
                      <th>Total No. of Connectors</th>									
                      <th>Total No. of Batteries</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="9"><div className="custom-list-loading" /></td>
                      </tr> : 
                      report.length > 0 ?
                          report.map((item,index)=>
                            <tr key={index}>
                              <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                              <td>{item.country_name}</td>
                              <td>{item.state_name}</td>
                              <td>{item.city_name}</td>
                              <td>{item.hub_name}</td>
                              <td>{item.total_ev}</td>
                              <td>{item.total_charger}</td>
                              <td>{item.total_connector}</td>
                              <td>{item.total_batteries}</td>
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

export default BatterySwappingNetworkReport;
