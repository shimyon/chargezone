import React from 'react';
import { Card, CardBody, CardTitle ,Progress,Spinner} from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';


const BatteryStatusChart =  ({ cardClass = 'dashboard-donut-chart' }) => {
  return (
    <Card className={cardClass}>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboard.batteries" />
        </CardTitle>
        {loading3 && (
                  <div className="text-center pt-3">
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      <IntlMessages id="dashboard.loading" />
                    </p>
                  </div>
                ) }
        {(!loading3 && !blankMsg) && data.map((s, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="mb-2">
                {s.title}
                <span className="float-right text-muted">
                  {s.status}/{s.total}
                </span>
              </p>
              <Progress value={(s.status / s.total) * 100} />
            </div>
          );
        })}

{(blankMsg) && data1.map((s, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="mb-2">
                {s.title}
                <span className="float-right text-muted">
                  {s.status}/{s.total}
                </span>
              </p>
              <Progress value={(s.status / s.total) * 100} />
            </div>
          );
        })}

        
        
      </CardBody>
    </Card>
  );
};
const  setBlankMsg = (value) => {blankMsg=value};
let blankMsg=false;
const data = [
  {
    title: 'In Charge',
    total: 0,
    status: 0,
  },
  {
    title: 'Charged',
    total: 0,
    status: 0,
  },
  {
    title: 'Discharged',
    total: 0,
    status: 0,
    
  },
  {
    title: 'Faulty',
    total: 0,
    status: 0,
  },
  {
    title: 'Out',
    total: 0,
    status: 0,
  },
 
];
const data1 = [
  {
    title: 'In Charge',
    total: 0,
    status: 0,
  },
  {
    title: 'Charged',
    total: 0,
    status: 0,
  },
  {
    title: 'Discharged',
    total: 0,
    status: 0,
    
  },
  {
    title: 'Faulty',
    total: 0,
    status: 0,
  },
  {
    title: 'Out',
    total: 0,
    status: 0,
  },
 
];

const setBatteryChartData = (index,total,status) => {data[index].status=status;data[index].total=total;

  setBlankMsg(false);
 if(data[0].total==0 && data[1].total==0 && data[2].total==0 && data[3].total==0 && data[4].total==0)
 {
   setBlankMsg(true);
   
 }
};
let loading3= false;
const  setLoading3 = (value) => {loading3=value};

export  {BatteryStatusChart,setBatteryChartData,setLoading3};
