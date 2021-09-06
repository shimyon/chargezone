import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Battery = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Battery')
);
const AddBattery = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddBattery')
);
const UpdateBatteryInventory = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateBatteryInventory')
);
const Charger = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Charger')
);
const AddCharger = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddCharger')
);
const UpdateChargerInventory = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateChargerInventory')
);
const EvInventoryMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './EvInventoryMaster')
);
const AddEvInventory = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddEvInventory')
);
const UpdateEvInventory = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateEvInventory')
);

const Inventory = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/battery`} />
      <ProtectedRoute
              path={`${match.url}/battery`}
              component={Battery}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addbattery`} />
      <ProtectedRoute
              path={`${match.url}/addbattery`}
              component={AddBattery}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatebattery_inventory`} />
      <ProtectedRoute
              path={`${match.url}/updatebattery_inventory`}
              component={UpdateBatteryInventory}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/charger`} />
      <ProtectedRoute
              path={`${match.url}/charger`}
              component={Charger}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addcharger`} />
      <ProtectedRoute
              path={`${match.url}/addcharger`}
              component={AddCharger}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatecharger_inventory`} />
      <ProtectedRoute
              path={`${match.url}/updatecharger_inventory`}
              component={UpdateChargerInventory}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/evInventory`} />
      <ProtectedRoute
              path={`${match.url}/evInventory`}
              component={EvInventoryMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addEv_inventory`} />
      <ProtectedRoute
              path={`${match.url}/addEv_inventory`}
              component={AddEvInventory}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateEv_inventory`} />
      <ProtectedRoute
              path={`${match.url}/updateEv_inventory`}
              component={UpdateEvInventory}
              roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Inventory;
