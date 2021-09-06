import React,{useState,useEffect} from 'react';
import {
  Row, Card, CardBody, FormGroup, Label,
  Input, Table,Button,DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {faultReportAPI,downloadfaultReportAPI,getStationsByCityAPI,getCountriesAPI,getStatesByCountryAPI,getCitiesByStateAPI,getOemAPI,getOwnersAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';

const FaultsAndAlerts = ({}) => {
  const [buttonType,setButtonType] = useState(1);
  //date states
  const [fromDate,setFromDate] = useState();
  const [toDate,setToDate] = useState();
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
  const [oemList,setOemList] = useState([]);
  const [ownerList,setOwnerList] = useState([]);
  const [countryId,setCountryId] = useState("");
  const [stateId,setStateId] = useState("");
  const [cityId,setCityId] = useState("");
  const [stationId,setStationId] = useState("");
  //params
  const [reportParams,setReportParams] = useState(null);
  const [report,setReport] = useState([]);

  useEffect(()=>{
    getCountryNamesAPICall();
    getOemAPICall();
    GetOwnerNamesAPICall();
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
    });
  }

  const getOemAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getOemAPI,
      {type:1},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {          
          setOemList(responseData.data);
        }else{
          setOemList([])
        }
      }).catch(error=>{
        console.log(error);
      })
  }

  const GetOwnerNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getOwnersAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setOwnerList(responseData.data)
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
          console.log(responseData.status,responseData.msg);
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
          console.log(responseData.status,responseData.msg);
        }
      }).catch(error=>{
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
    getFaultReportAPICall(reportParams);
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
  const getFaultReportAPICall = async(params) => {
    setButtonDisabled(true);
    setReport([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.post(faultReportAPI,
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
      })
  }
  const downloadFaultReportAPICall = async(params) => {
    setButtonDisabled(true);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.post(downloadfaultReportAPI,
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
      })
  }

  const initialValues = {
    bin:"",
    oem_id:"",
    owner_id:"",
    charger_id:"",
    connector_id:"",
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Faults and Alerts</span>
        <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
          let tempFromDate=null,tempToDate=null;
          if (fromDate != null && fromDate !="") {
            tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear()+" "+fromDate.getHours()+":"+fromDate.getMinutes()+":"+fromDate.getSeconds();
          }
          if (toDate != null && toDate !="") {
            tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear()+" "+toDate.getHours()+":"+toDate.getMinutes()+":"+toDate.getSeconds();
          }
          const params = {
            country_id:countryId,
            state_id:stateId,
            city_id:cityId,
            hub_id:stationId,
            bin:values.bin,
            oem_id:values.oem_id,
            owner_id:values.owner_id,
            charger_id:values.charger_id,
            connector_id:values.connector_id,
            from_date:tempFromDate,
            to_date:tempToDate,
            page:pageCount
          }
          setReportParams(params);
          if(buttonType==1){
            getFaultReportAPICall(params);
          }else{
            downloadFaultReportAPICall(params);
          }          
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                    <Card>
                        <CardBody>
                          <Row>
                          <Colxx md="6">
                            <h3>Select Option</h3>
                          </Colxx>                            
                          </Row>
                          <hr/>
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
                                  <option>Select Country</option>
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
                                  <option>Select State</option>
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
                                  <option>Select City</option>
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
                                onChange={e=> setStationId(e.target.value)}>
                                  <option>Select Station</option>
                                  {stationNames.map((item,index)=>
                                    <option key={index} value={item.hub_master_id}>{item.name}</option>
                                  )}
                                </Input>
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  OEM
                                </Label>
                                <Input 
                                type="select"
                                name="oem_id"
                                value={values.oem_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                  <option>Select OEM</option>
                                  {oemList.map((item,index)=>
                                    <option key={index} value={item.oem_id}>{item.name}</option>
                                  )}
                                </Input>
                                {errors.oem_id && touched.oem_id &&(
                                  <span className="error">{errors.oem_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  Owner
                                </Label>
                                <Input 
                                type="select"
                                name="owner_id"
                                value={values.owner_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                  <option>Select Owner</option>
                                  {ownerList.map((item,index)=>
                                    <option key={index} value={item.owner_master_id}>{item.name}</option>
                                  )}
                                </Input>
                                {errors.owner_id && touched.owner_id &&(
                                  <span className="error">{errors.owner_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  Charger
                                </Label>
                                <Input 
                                type="text"
                                placeholder="Charger Id"
                                name="charger_id"
                                value={values.charger_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                </Input>
                                {errors.charger_id && touched.charger_id &&(
                                  <span className="error">{errors.charger_id}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={3} sm={12}>
                              <FormGroup>
                                <Label>
                                  Connector
                                </Label>
                                <Input 
                                type="text"
                                placeholder="Connector Id"
                                name="connector_id"
                                value={values.connector_id}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                </Input>
                                {errors.connector_id && touched.connector_id &&(
                                  <span className="error">{errors.connector_id}</span>
                                )}
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
                            <Colxx lg={6} sm={12}>
                              <Button color="primary" className="default mt-4 mr-2" disabled={buttonDisabled} onClick={() =>{setButtonType(1);setPageCount(1);handleSubmit();}} >
                                <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Generate Report</b>
                              </Button>
                              <Button color="success" className="default mt-4" disabled={buttonDisabled} onClick={() =>{setButtonType(2);handleSubmit();}}  >
                                <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Download Report</b>
                              </Button>
                            </Colxx>
                          </Row>
                        </CardBody>
                    </Card>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>
      <Row>
          <Colxx sm={12} lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <Colxx md="6">
                    <h3>Faults and Alerts Report</h3>
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
                      <th>Charger ID</th>
                      <th>Connnector ID</th>
                      <th>Date of occurrence</th>
                      <th>Time of occurrence</th>
                      <th>Alarm Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ?
                        <tr>
                            <td className="text-center" colSpan="7"><div className="custom-list-loading" /></td>
                        </tr> : 
                        report.length > 0 ?
                            report.map((item,index)=>
                            <tr key={index}>
                              <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                              <td>{item.station_name}</td>
                              <td>{item.charger_id}</td>
                              <td>{item.connector_id}</td>
                              <td>{item.occur_date}</td>
                              <td>{item.occur_time}</td>
                              <td>{item.alarms}</td>
                            </tr>
                            ):
                            <tr>
                            <td className="text-center text-danger" colSpan="7">Data  Not  Found</td>
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

export default FaultsAndAlerts;
