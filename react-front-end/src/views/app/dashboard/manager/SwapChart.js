import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  
} from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { LineChart } from '../../../../components/charts';
import { ThemeColors } from '../../../../helpers/ThemeColors';
const moment = require('moment');

const colors = ThemeColors();

const today = moment();
today.add(1, 'd').format('DD-MMM')
const dateLabel = Array(7).fill().map(
() => today.subtract(1, 'd').format('DD-MMM')
);
let total_last_7=0;
const SwapChartCard = () => {
  return (
    <Card className="dashboard-my-card">
     
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboard.swaps" />({total_last_7})
        </CardTitle>
        {showSwapChart && (
        <div className="dashboard-line-chart">
          <LineChart  data={SwapChartData1} />
        </div>)}
        {!showSwapChart && (
        <div className="dashboard-line-chart">
          <LineChart  data={SwapChartData} />
        </div>)}
        
      </CardBody>
    </Card>
  );
};
const SwapChartData1 = {
  labels:dateLabel,
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

const SwapChartData = {
    labels:dateLabel,
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
  let showSwapChart=true;
  const  setshowSwapChart = (value) => {showSwapChart=value};
  const setSwapChartData = (responseData) => {

    setshowSwapChart(true);
     //lineChartOptions.scales.yAxes[0].ticks.max=500;
    // lineChartOptions.scales.yAxes[0].ticks.min=1000;
     //lineChartOptions.scales.yAxes[0].ticks.stepSize=100;
    total_last_7=responseData.data.swapping.total_last_7;
    SwapChartData.labels= responseData.data.swapping.date;
    SwapChartData.datasets[0].data=responseData.data.swapping.complete_swap_data;
    //SwapChartData.datasets[1].data=responseData.data.swapping.incomplete_swap_data;
    setshowSwapChart(false);
    

  };


export  {SwapChartCard,setSwapChartData,setshowSwapChart};
