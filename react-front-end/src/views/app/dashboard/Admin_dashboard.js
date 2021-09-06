import React,{useState,useEffect} from 'react';
import { 
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';

import {getStationsAPI,getDashboardDataAPI} from '../../../constants/defaultValues'
import { getCurrentUser } from '../../../helpers/Utils'
import axios from 'axios';
import { ThemeColors } from '../../../helpers/ThemeColors';
import {ChargerDoughnut, setChargerChartData} from './operator/ChargerDoughnut';
import {ConnectorDoughnut,setConnectorChartData} from './operator/ConnectorDoughnut';
import {BatteryStatusChart,setBatteryChartData} from './operator/BatteryStatusChart';
import { IconCardsCarousel, setBatteriesCount, setChargerCount, setConnectorCount, setEVCount,setStationCount } from './manager/cardCarousel';
import {SwapChartCard,setSwapChartData,setshowSwapChart} from './manager/SwapChart';
import {EnergyChartCard,setEnergyChartData, setshowEnergyChart} from './manager/EnergyChart';
import {KPICards,setKPIChartData} from './manager/KPICards';
import { StationDoughnut,setStationChartData } from './manager/StationDoughnut';
const colors = ThemeColors();

const Admin_dashboard = () => {
  //All station names
  const [stationNameData,setStationNameData] = useState([]);
  
  //Swapping useStates
  
  const [swappingChartData,setSwappingChartData] = useState({}); //swapping chart data
  const [swappingDropHeader,setSwappingDropHeader] = useState("All Stations"); //swapping dropdown header
  const [swappingStation,setSwappingStation] = useState('0'); //swapping chart dropdown
  //Batteries useStates
  
  //Chargers useStates
  const [chargerData,setChargerData] = useState({}); //charger card and chart data
  
  const [chargerStation,setChargerStation] = useState('0'); //chargers chart dropdown
  //Slots useState
  
  const [slotStation,setSlotStation] = useState('0'); //slots chart dropdown


  useEffect(()=>{
    GetStationNamesAPICall();
  },[])
  useEffect(()=>{
    GetDashboardDataAPICall();
  },[swappingStation,chargerStation,slotStation])

  //API call
  const GetStationNamesAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.get(getStationsAPI,
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {
        //stationNamesData = responseData.data;
        setStationNameData(responseData.data)
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  const GetDashboardDataAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getDashboardDataAPI,
    {
     station_id:swappingStation
    },
    {headers:{Authorization: `Bearer ${currentUser.token}`}})
    .then(response=>{
      const responseData = response.data;
      if (responseData.status === 1) {

        setshowEnergyChart(true);
        setshowSwapChart(true);
        setStationCount(responseData.data.station.total);
        setBatteriesCount(responseData.data.batteries.total)
       
        setChargerCount(responseData.data.chargers.total);
       
        setEVCount(responseData.data.ev.total);
        setConnectorCount(responseData.data.slots.total);

        setBatteryChartData(0,responseData.data.batteries.total,responseData.data.batteries.in_charging);
        setBatteryChartData(1,responseData.data.batteries.total,responseData.data.batteries.charged);
        setBatteryChartData(2,responseData.data.batteries.total,responseData.data.batteries.discharged);
        setBatteryChartData(3,responseData.data.batteries.total,responseData.data.batteries.faulty);
        setBatteryChartData(4,responseData.data.batteries.total,responseData.data.batteries.out);
        
        setChargerChartData(responseData.data.chargers.operational,responseData.data.chargers.faulty);
        setConnectorChartData( responseData.data.slots.inuse,responseData.data.slots.available,responseData.data.slots.faulty);
        setStationChartData(responseData.data.station.operational,responseData.data.station.faulty);
        setChargerData(responseData.data.chargers);
        setEnergyChartData(responseData);
        setSwapChartData(responseData);
       
        setKPIChartData(0,abbreviateNumber(responseData.data.energy_sold.cumulative),abbreviateNumber(responseData.data.misc.unit_30)+" in last 30 days");
        setKPIChartData(1,abbreviateNumber(responseData.data.energy_sold.avg_unit_per_ev_per_day),"");
        setKPIChartData(2,responseData.data.swapping.daily,abbreviateNumber(responseData.data.misc.swap_30)+" in last 30 days");

        setSwappingChartData({
          labels: responseData.data.swapping.date,
          datasets: [
            {
              label: 'Complete',
              data: responseData.data.swapping.complete_swap_data,
              borderColor: colors.themeColor1,
              pointBackgroundColor: colors.foregroundColor,
              pointBorderColor: colors.themeColor1,
              pointHoverBackgroundColor: colors.themeColor1,
              pointHoverBorderColor: colors.foregroundColor,
              pointRadius: 6,
              pointBorderWidth: 2,
              pointHoverRadius: 8,
              fill: false,
            },
            {
              label: 'Incomplete',
              data: responseData.data.swapping.incomplete_swap_data,
              borderColor: colors.themeColor2,
              pointBackgroundColor: colors.foregroundColor,
              pointBorderColor: colors.themeColor2,
              pointHoverBackgroundColor: colors.themeColor2,
              pointHoverBorderColor: colors.foregroundColor,
              pointRadius: 6,
              pointBorderWidth: 2,
              pointHoverRadius: 8,
              fill: false,
            },
        ],
        });
               
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  const abbreviateNumber =(num)=>{
   let fixed=0;
    if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
  }
  //dropdown handle methods
 
  //swapping dropdown
  const handleSwappingStationSelect =(e)=>{
    setSwappingDropHeader(e.currentTarget.textContent);
    setSwappingStation(e.target.value);
  }
 
  return (
    <>
     <Row>
        <Colxx xxs="12">
         <span className="page_title">Admin Dashboard</span>
         <div className="btn-group float-right float-none-xs">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                color='primary'>
                {swappingDropHeader}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Stations</DropdownItem>
                <DropdownItem key={0} value={0} onClick={e=>handleSwappingStationSelect(e)}>All Stations</DropdownItem>
                {stationNameData.map((item,i) =>
                  <DropdownItem key={i} value={item.hub_master_id} onClick={e=>handleSwappingStationSelect(e)}>{item.name}</DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
         <Separator className="mb-5" />
        </Colxx>
      </Row>     
      <Row>
        <Colxx lg="12" xl="12" md="12">
          <IconCardsCarousel />         
        </Colxx>       
      </Row>
      <Row>
        <Colxx lg="5" xxs="12" className="mb-5">
          <SwapChartCard />
        </Colxx>
        <Colxx lg="2" xxs="12" className="mb-2">
         <KPICards />
        </Colxx>
        <Colxx lg="5" xxs="12" className="mb-5">
          <EnergyChartCard />
        </Colxx>
      </Row>
      <Row className="mb-12">
      <Colxx sm="12" md="6" lg="3" className="mb-3">
          <StationDoughnut />
        </Colxx>
        <Colxx sm="12" md="6" lg="3" className="mb-3">
          <ChargerDoughnut />
        </Colxx>
        <Colxx sm="12" md="6" lg="3" className="mb-3">
          <BatteryStatusChart cardClass="dashboard-progress"  />
        </Colxx>    
        <Colxx sm="12" md="6" lg="3" className="mb-3">
          <ConnectorDoughnut />
        </Colxx>       
    </Row>
    </>
  );
};

export default Admin_dashboard;