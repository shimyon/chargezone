import React from 'react';
import { Card, CardBody, CardTitle, UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu, Spinner} from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { DoughnutChart } from '../../../../components/charts';

import { ThemeColors } from '../../../../helpers/ThemeColors';

const colors = ThemeColors();


const StationDoughnut =  ({ controls = false })  => {
  return (
    <Card className="dashboard-my-card">
      <CardBody>
         <CardTitle>
          <IntlMessages id="dashboard.station" />
          {controls && (
          <div className="btn-group float-right float-none-xs ">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="dashboard.all" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="dashboard.operational" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="dashboard.faulty" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
        </CardTitle>
      {loading2 && (
                  <div className="dashboard-donut-chart">
                  <DoughnutChart  data={doughnutChartData1} />
                </div>
              ) } { (!loading2  && !blankMsg)  &&
      <div className="dashboard-donut-chart">
        <DoughnutChart  data={doughnutChartData} />
      </div>
}
{ blankMsg &&
      <div className="dashboard-donut-chart text-center">
        Data Not Found
      </div>
}
      </CardBody>
    </Card>
  );
};
const doughnutChartData1 = {
  labels: ['Operational', 'Faulty'],
  datasets: [
    {
      label: '',
      borderColor: [ colors.themeColor2, colors.themeColor1],
      backgroundColor: [
        colors.themeColor3_10,
        colors.themeColor2_10,
      ],
      borderWidth: 2,
      data: [1, 0],
    },
  ],
};
const doughnutChartData = {
  labels: ['Operational', 'Faulty'],
  datasets: [
    {
      label: '',
      borderColor: [ colors.themeColor2, colors.themeColor1],
      backgroundColor: [
        colors.themeColor3_10,
        colors.themeColor2_10,
      ],
      borderWidth: 2,
      data: [1, 0],
    },
  ],
};
let blankMsg=false;
const  setBlankMsg = (value) => {blankMsg=value};

let loading2=true;
const  setLoading2 = (value) => {loading2=value};
//const setChargerChartData = (index,value) => {doughnutChartData.datasets[0].data[index]=value;};
const setStationChartData = (oprntl,flty) => {
  doughnutChartData.datasets[0].data[0]=oprntl;
  doughnutChartData.datasets[0].data[1]=flty;


  if(oprntl==0 && flty==0)
  {
    setBlankMsg(true);
    
  }
  else
 {
  setBlankMsg(false);
 }
  setLoading2(false);
  

};

export  {StationDoughnut,setLoading2,setStationChartData};
