import React from 'react';
import { Card, CardBody, Col, Row,Spinner} from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';


const KPICards =  ({ cardClass = 'text-center mb-2' }) => {
  return (
    <div>
        
        {loading3 && (
                  <div className="text-center pt-3">
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      <IntlMessages id="dashboard.loading" />
                    </p>
                  </div>
                ) }
        {!loading3 && data.map((s, index) => {
          return (
            <Card className={cardClass} key={index}>
            <CardBody>
            <div  >
                    <p className="lead color-theme-1 mb-1 value ">{s.total}</p>
                    <p className="mb-0 label text-small font-weight-semibold mb-1"> {s.title}</p>
                    <p className="mb-0 label text-small"> {s.last30} </p>
                

            </div>
            </CardBody>
            </Card>
          );
        })}
        
        </div>
          );
};

const data = [
    {
        title: 'Units Sold',
        total: 0,
        last30 : "0 in last 30 days"
      },
      {
        title: 'Units/Day per EV',
        total: 0,
        last30 : " "
      },
    {
        title: 'Swaps/Day',
        total: 0,
        last30 : "0 in last 30 days"
      },
   
 
  
 
];

const setKPIChartData = (index,total,last30) => {data[index].total=total;data[index].last30 =last30;};
let loading3= false;
const  setLoading3 = (value) => {loading3=value};

export  {KPICards,setKPIChartData,setLoading3};
