import React,{useState,useEffect} from 'react';
import {
  Row, Card, CardBody, FormGroup, Label,
  Input, Button,Alert
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {historyReportAPI} from '../../../constants/defaultValues'
import axios from 'axios';

const BatteryHistoricalData = ({}) => {
  //date states
  const [fromDate,setFromDate] = useState();
  const [toDate,setToDate] = useState();
  const [bin,setBin] = useState();
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //loader state
  const [isLoading,setIsLoading] = useState(false);

  //helper methods
  //Alert helper methods
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  const downloadExcelReport = async() => {
    setAlertVisible(false);
    
    const currentUser = getCurrentUser();
    let tempFromDate=null,tempToDate=null;
    if (fromDate != null && fromDate !="") {
      tempFromDate = fromDate.getDate()+"-"+(fromDate.getMonth()+1)+"-"+fromDate.getFullYear()+" "+fromDate.getHours()+":"+fromDate.getMinutes()+":"+fromDate.getSeconds();
    }
    if (toDate != null && toDate !="") {
      tempToDate = toDate.getDate()+"-"+(toDate.getMonth()+1)+"-"+toDate.getFullYear()+" "+toDate.getHours()+":"+toDate.getMinutes()+":"+toDate.getSeconds();
    }
    if (tempToDate == null || tempFromDate ==null) {
      setAlertVisible(true);
      setAlertMsg("Please Select From and To date.");
      setAlertColor("danger");
      return; 
    }
    setButtonDisabled(true);
    setIsLoading(true);
    
    const params = {
      bin:bin,
      from_date:tempFromDate,
      to_date:tempToDate
    }
    
    await axios.post(historyReportAPI,
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
          setAlertVisible(true);
          setAlertMsg(responseData.msg);
          setAlertColor("danger");
        }        
        setButtonDisabled(false);
        setIsLoading(false);
      }).catch(error=>{
        setButtonDisabled(false);
        setIsLoading(false);
        console.log(error);
      })
  }
  //Form Validation Schema
  return (
    <>
      <Row>
        <Colxx xxs="12">
        <span className="page_title">Battery Historical Data</span>
        <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
            <Card>
                <CardBody>
                  <h3>Select Option</h3>
                  <hr/>
                  <Row>
                    <Colxx md="12">
                      <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                        {alertMsg}
                      </Alert>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          BIN
                        </Label>
                        <Input 
                          type="text"
                          placeholder="BIN"
                          name="bin"
                          value={bin}
                          onChange={e=>setBin(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Colxx>
                    <Colxx lg={3} sm={12}>
                      <FormGroup>
                        <Label>
                          From Date
                        </Label>
                        <DatePicker
                        showTimeInput
                        placeholderText="From Date"
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
                        showTimeInput
                        placeholderText="From Date"
                        selected={toDate}
                        onChange={date=>setToDate(date)}
                        dateFormat="dd/MM/yyyy hh:mm aa"
                        />
                      </FormGroup>
                    </Colxx>
                    <Colxx md="3">
                      <Button color="primary" className="default mt-4" onClick={() => downloadExcelReport()} disabled={buttonDisabled}>
                        <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>{isLoading ?
<span>Please Wait</span> : <span>Download Excel Report</span>}</b>
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

export default BatteryHistoricalData;
