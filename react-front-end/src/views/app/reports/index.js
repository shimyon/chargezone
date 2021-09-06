import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const BatterySwappingNetworkReport = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './batterySwappingNetworkReport')
);
const BatteryHistoricalData = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './batteryHistoricalData')
);
const ChargingSummary = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './chargingSummary')
);
const SwappingTransaction = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './swappingTransaction')
);
const Swap = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './swap')
);
const WeeklyBillingRef = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './weeklyBillingRef')
);
const FaultsAndAlerts = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './faultsAndAlerts')
);

const Reports = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/batterySwappingNetworkReport`} />
      <ProtectedRoute
              path={`${match.url}/batterySwappingNetworkReport`}
              component={BatterySwappingNetworkReport}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/batteryHistoricalData`} />
      <ProtectedRoute
              path={`${match.url}/batteryHistoricalData`}
              component={BatteryHistoricalData}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chargingSummary`} />
      <ProtectedRoute
              path={`${match.url}/chargingSummary`}
              component={ChargingSummary}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/swap`} />
      <ProtectedRoute
              path={`${match.url}/swap`}
              component={Swap}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/swappingTransaction`} />
      <ProtectedRoute
              path={`${match.url}/swappingTransaction`}
              component={SwappingTransaction}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/weeklyBillingRef`} />
      <ProtectedRoute
              path={`${match.url}/weeklyBillingRef`}
              component={WeeklyBillingRef}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
       <Redirect exact from={`${match.url}/`} to={`${match.url}/faultsAndAlerts`} />
      <ProtectedRoute
              path={`${match.url}/faultsAndAlerts`}
              component={FaultsAndAlerts}
              roles={[UserRole.Admin, UserRole.Manager]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Reports;
