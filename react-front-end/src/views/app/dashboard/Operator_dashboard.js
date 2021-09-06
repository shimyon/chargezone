import React,{useState,useEffect} from 'react';
import { 
  Row,
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {getDashboardDataAPI} from '../../../constants/defaultValues'
import { getCurrentUser } from '../../../helpers/Utils'
import axios from 'axios';
import { ThemeColors } from '../../../helpers/ThemeColors';
import {IconCardsCarousel,setChargerCount,setConnectorCount,setBatteriesCount,setEVCount} from './operator/cardCarousel';
import {ChargerDoughnut, setChargerChartData} from './operator/ChargerDoughnut';
import {ConnectorDoughnut,setConnectorChartData} from './operator/ConnectorDoughnut';
import {BatteryStatusChart,setBatteryChartData} from './operator/BatteryStatusChart';


const colors = ThemeColors();

const Operator_dashboard = ({ match }) => {
 
  const [batteryStatus,setBatteryStatus] = useState('0'); //batteries chart dropdown
   //Slots useState
  const [refresh,setRefresh]= useState({});
  useEffect(()=>{
  
    GetDashboardDataAPICall();
  },[batteryStatus])

  //API call
  const GetDashboardDataAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getDashboardDataAPI,
    {battery_satus_id:batteryStatus},
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
     setBatteriesCount(responseData.data.batteries.total)
       
       setChargerCount(responseData.data.chargers.total);
      
        setEVCount(responseData.data.ev.total);
        setConnectorCount(responseData.data.slots.total);

       setBatteryChartData(0,responseData.data.batteries.total,responseData.data.batteries.in_charging);
       setBatteryChartData(1,responseData.data.batteries.total,responseData.data.batteries.charged);
       setBatteryChartData(2,responseData.data.batteries.total,responseData.data.batteries.discharged);
       setBatteryChartData(3,responseData.data.batteries.total,responseData.data.batteries.faulty);
       setBatteryChartData(4,responseData.data.batteries.total,responseData.data.batteries.faulty);
       
       setChargerChartData(responseData.data.chargers.operational,responseData.data.chargers.faulty);
       setConnectorChartData( responseData.data.slots.inuse,responseData.data.slots.available,responseData.data.slots.faulty);
       setRefresh(responseData);
          
      }else{
        console.log(responseData.msg);
      }
    }).catch(error=>{
      console.log(error);
    })
  }

 
  return (
    <>
      <Row>
        <Colxx xxs="12">
         <span className="page_title">Operator Dashboard</span>
         <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="12" md="12">
          <IconCardsCarousel />         
        </Colxx>       
      </Row>
      <Row className="mb-12">
        <Colxx sm="12" md="4" className="mb-4">
          <ChargerDoughnut />
        </Colxx>
        <Colxx sm="12" md="4" className="mb-4">
          <BatteryStatusChart cardClass="dashboard-progress"  />
        </Colxx>
    
        <Colxx sm="12" md="4" className="mb-4">
          <ConnectorDoughnut />
        </Colxx>       
    </Row>
    </>
  );
};

export default Operator_dashboard;