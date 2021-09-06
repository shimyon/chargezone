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
import {getStationsAPI,weeklyBillRefReportAPI,downloadWeeklyBillRefReportAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';

const WeeklyBillingRef = ({}) => {
  const [buttonType,setButtonType] = useState(1);
  //date states
  const [fromDate,setFromDate] = useState();
  const [toDate,setToDate] = useState();
  //DTAE ERRORFLAGS
  const [fromDateError,setFromDateError] = useState(false);
  const [toDateError,setToDateError] = useState(false);
  //time state
  // const [startTime,setStartTime] = useState();
  // const [endTime,setEndTime] = useState();
  //station List
  const [stationNames,setStationNames] = useState([]);
  //report
  const [report,setReport] = useState([]);
  const [dates,setDates] = useState([]);
  //Pagination states
  const [pageCount,setPageCount] = useState("1");
  const [lastPageCount,setLastPageCount] = useState("1");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //loader state
  const [isLoading,setIsLoading] = useState(false);
  //params
  const [reportParams,setReportParams] = useState(null);

  useEffect(()=>{
    GetStationNamesAPICall();
  },[])

  //API calls
  const GetStationNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getStationsAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        setStationNames(responseData.data)
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }
  const getWeeklyBillRefReportAPICall = async(params) => {
    setButtonDisabled(true);
    setReport([]);
    setDates([]);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.post(weeklyBillRefReportAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          setLastPageCount(responseData.data.last_page);
          setReport(responseData.data.data.energy_data);
          setDates(responseData.data.data.selected_week_dates);
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
  const downloadWeeklyBillRefReportAPICall = async(params) => {
    setButtonDisabled(true);
    setIsLoading(true);
    const currentUser = getCurrentUser();
    await axios.post(downloadWeeklyBillRefReportAPI,
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
  //pagination method
  const handlePageChange = (index) =>{
    setPageCount(index+1)
    getWeeklyBillRefReportAPICall(reportParams);
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
  //Forms
  const initialValues = {
    station:"",
  };
  

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <span className="page_title">Weekly Billing Report</span>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues} 
        onSubmit={(values)=>{
          let tempFromDate,tempToDate;
          if (fromDate == null || fromDate =="" && toDate == null || toDate =="") {
            setFromDateError(true);
            setToDateError(true);
            return ;
          }else if(fromDate == null || fromDate =="" || toDate == null || toDate ==""){
            if (fromDate == null | fromDate =="") {
              setToDateError(false);
              setFromDateError(true);
              return;
            }else if(toDate == null | toDate ==""){
              setFromDateError(false);
              setToDateError(true);
              return ;
            }
          }else{
            setFromDateError(false);
            setToDateError(false);
            tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear();
            tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear();
          }
          const params = {
            hub_id:values.station,
            from_date:tempFromDate,
            to_date:tempToDate,
            page:pageCount
          }
          setReportParams(params)
          if(buttonType==1){
            getWeeklyBillRefReportAPICall(params);
          }else{
            downloadWeeklyBillRefReportAPICall(params);
          }
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                    <Card>
                        <CardBody>
                          <Row>
                            <Colxx lg={2} sm={12}>
                              <FormGroup>
                                <Label>
                                  Station
                                </Label>
                                <Input 
                                type="select"
                                name="station"
                                value={values.station}
                                onChange={handleChange}
                                onBlur={handleBlur}>
                                  <option key={0} value={0}>All Station</option>
                                  {stationNames.map((item,i)=>
                                    <option key={i} value={item.hub_master_id}>{item.name}</option>
                                  )}
                                </Input>
                                {errors.station && touched.station &&(
                                  <span className="error">{errors.station}</span>
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
                                {fromDateError &&
                                  <span className="error">{"From date is required"}</span>
                                }
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
                                {toDateError &&
                                  <span className="error">{"To date is required"}</span>
                                }
                              </FormGroup>
                            </Colxx>
                            <Colxx lg={4} sm={12}>
                                <Button color="primary" className="default mt-4 mr-2"  onClick={() =>{setButtonType(1);setPageCount(1);handleSubmit();}} disabled={buttonDisabled} >
                                  <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Generate Report</b>
                                </Button>
                                <Button color="success" className="default mt-4"  onClick={() =>{setButtonType(2);handleSubmit();}} disabled={buttonDisabled} >
                                  <b>Download Report</b>
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
                  <h3>Weekly Billing Report</h3>
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
                      <th>EV Qr Code</th>
                      {dates.length>0?
                        <>
                          <th>{dates[0]}</th>
                          <th>{dates[1]}</th>
                          <th>{dates[2]}</th>
                          <th>{dates[3]}</th>
                          <th>{dates[4]}</th>
                          <th>{dates[5]}</th>
                          <th>{dates[6]}</th>
                        </>:
                        <>
                          <th>Date of Day1</th>
                          <th>Date of Day2</th>
                          <th>Date of Day3</th>
                          <th>Date of Day4</th>
                          <th>Date of Day5</th>
                          <th>Date of Day6</th>
                          <th>Date of Day7</th>
                        </>
                      }
                      <th>Total Energy Supplied</th>
                      <th>Total Amount  Billed</th>
                    </tr>
                  </thead>
                  <tbody>
                  {isLoading ?
                      <tr>
                          <td className="text-center" colSpan="12"><div className="custom-list-loading" /></td>
                      </tr> : 
                      report.length > 0 ?
                          report.map((item,index)=>
                            <tr key={index}>
                              <th scope="row">{pageCount==1?index+1:(pageCount-1)*10+index +1}</th>
                              <td>{item.station_name}</td>
                              <td>{item.e_qr_code}</td>
                              <td>{item.Day_1}</td>
                              <td>{item.Day_2}</td>
                              <td>{item.Day_3}</td>
                              <td>{item.Day_4}</td>
                              <td>{item.Day_5}</td>
                              <td>{item.Day_6}</td>
                              <td>{item.Day_7}</td>
                              <td>{item.total_energy_supp}</td>
                              <td>{item.total_bill_amount}</td>
                            </tr>
                          ):<tr>
                          <td className="text-center text-danger" colSpan="12">Data  Not  Found</td>
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

export default WeeklyBillingRef;