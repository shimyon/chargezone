import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { LineChart } from '../../../../components/charts';
import { ThemeColors } from '../../../../helpers/ThemeColors';
import { chartTooltip } from '../../../../components/charts/util';
//import { lineChartOptions } from '../../../../components/charts/config';

const moment = require('moment');

const colors = ThemeColors();

const today = moment();
today.add(1, 'd').format('DD-MMM')
const dateLabel = Array(7).fill().map(
() => today.subtract(1, 'd').format('DD-MMM')
);
let total_last_7=0;

const EnergyChartCard = () => {
  return (
    <Card className="dashboard-my-card">     
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboard.energy" /> ({abbreviateNumber(total_last_7)})
        </CardTitle>
        {showEnergyChart && (
        <div className="dashboard-line-chart">
          <LineChart  data={EnergyChartData1} />
        </div>)}
        {!showEnergyChart && (
        <div className="dashboard-line-chart">
          <LineChart  data={EnergyChartData} false lineChartOptions />
        </div>)}
        
      </CardBody>
    </Card>
  );
};
const EnergyChartData1 = {
  labels: dateLabel,
  datasets: [
    {
      label: 'Complete',
      data: [0,0,0,0,0,0,0],
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
  ]
};

const EnergyChartData = {
    labels: dateLabel,
    datasets: [
      {
        label: 'Complete',
        data: [0,0,0,0,0,0,0],
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
    ]
  };
  let showEnergyChart=true;
  const  setshowEnergyChart = (value) => {showEnergyChart=value};
  const setEnergyChartData = (responseData) => {
    setshowEnergyChart(true);
    // lineChartOptions.scales.yAxes[0].ticks.max=1000;
    // lineChartOptions.scales.yAxes[0].ticks.min=1000;
    // lineChartOptions.scales.yAxes[0].ticks.stepSize=1000;
    total_last_7=responseData.data.energy_sold.total_last_7;

    
    EnergyChartData.labels= responseData.data.energy_sold.date;
    EnergyChartData.datasets[0].data=responseData.data.energy_sold.data;
    setshowEnergyChart(false);
    

  };
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
    
export  {EnergyChartCard,setEnergyChartData,setshowEnergyChart};
