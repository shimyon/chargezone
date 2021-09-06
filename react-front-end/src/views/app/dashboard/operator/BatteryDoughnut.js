import React from 'react';
import { Card, CardBody, CardTitle, UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu, } from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { PolarAreaChart } from '../../../../components/charts';
import { DoughnutChart } from '../../../../components/charts';
import { ThemeColors } from '../../../../helpers/ThemeColors';

const colors = ThemeColors();


const BatteryDoughnut =  ({ chartClass = 'chart-container', controls = false })  => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboard.batteries" />
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
      
        <div className={chartClass}>
          <DoughnutChart shadow data={polarAreaChartData} />
        </div>
        
      </CardBody>
    </Card>
  );
};
const polarAreaChartData = {
  labels: ['In Charge', 'Charged', 'Discharged', 'Faulty'],
  datasets: [
    {
      data: [20, 50, 25,5],
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

export default BatteryDoughnut;
