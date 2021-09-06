import React from 'react';
import { Card, CardBody, CardTitle, UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu, } from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { PolarAreaChart } from '../../../../components/charts';
import { DoughnutChart } from '../../../../components/charts';
import { PieChart } from '../../../../components/charts';
import { ThemeColors } from '../../../../helpers/ThemeColors';

const colors = ThemeColors();


const ConnectorDoughnut =  ({ chartClass = 'dashboard-donut-chart', controls = false })  => {
  return (
    <Card className="dashboard-my-card">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboard.connectors" />
          {controls && (
          <div className="btn-group float-right float-none-xs ">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="dashboard.all" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="dashboard.in" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="dashboard.out" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
        </CardTitle>
      
       
        
        {(loading4 ) && (
                   <div className={chartClass}>
                   <PieChart  data={polarAreaChartData1} />
                 </div>
                ) } { (!loading4 && !blankMsg) &&
                  <div className={chartClass}>
                  <PieChart  data={polarAreaChartData} />
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
const polarAreaChartData1 = {
  labels: ['In Use', 'Available', 'Faulty'],
  datasets: [
    {
      data: [33, 33,34],
      borderWidth: 2,
      borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3],
      backgroundColor: [
        colors.themeColor1_10,
        colors.themeColor2_10,
        colors.themeColor3_10,
        
      ],
    },
  ],
};
const polarAreaChartData = {
  labels: ['In Use', 'Available', 'Faulty'],
  datasets: [
    {
      data: [33, 33,34],
      borderWidth: 2,
      borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3, colors.themeColor4],
      backgroundColor: [
        colors.themeColor1_10,
        colors.themeColor2_10,
        colors.themeColor3_10,
        colors.themeColor4_10,
      ],
    },
  ],
};
const  setBlankMsg = (value) => {blankMsg=value};
let blankMsg=false;

const setConnectorChartData = (in_use,available,faulty) => {

 if(in_use==0 && available==0 && faulty==0)
 {
   setBlankMsg(true);
   
 }else
 {
  setBlankMsg(false);
 }

  polarAreaChartData.datasets[0].data[0]=in_use;
  polarAreaChartData.datasets[0].data[1]=available;
  polarAreaChartData.datasets[0].data[2]=faulty;
 
  // polarAreaChartData.labels[0]="In Use("+in_use+")";
  // polarAreaChartData.labels[1]="Available("+available+")";
  // polarAreaChartData.labels[2]="Faulty("+faulty+")";


  setLoading4(false);
  

};
let loading4=true;
const  setLoading4 = (value) => {loading4=value};

export  {ConnectorDoughnut,setConnectorChartData};
