import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const UserMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UserMaster')
);
const AddUser = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddUser')
);
const UpdateUser = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateUser')
);
const RoleMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './RoleMaster')
);
const AddRole = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddRole')
);
const BatteryMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './BatteryMaster')
);
const AddBattery = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddBattery')
);
const UpdateBattery = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateBattery')
);
const EvMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './EvMaster')
);
const AddEv = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddEV')
);
const UpdateEv = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateEv')
);
const BulkChargerMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './BulkChargerMaster')
);
const AddBulkCharger = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddBulkCharger')
);
const UpdateBulkCharger = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateBulkCharger')
);
const FleetMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './FleetMaster')
);
const AddFleet = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddFleet')
);
const UpdateFleet = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateFleet')
);
const OwnerMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './OwnerMaster')
);
const AddOwner = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddOwner')
);
const UpdateOwner = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateOwner')
);
const OEMMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './OEMMaster')
);
const AddOEM = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddOEM')
);
const UpdateOem = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateOem')
);
const SwappingStationMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './SwappingStationMaster')
);
const AddSwappingStation = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddSwappingStation')
);
const UpdateSwappingStation = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateSwappingStation')
);
const FaultMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './FaultMaster')
);
const AddFault = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddFault')
);
const UpdateFault = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './UpdateFault')
);
const CountryMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './CountryMaster')
);
const StateMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './StateMaster')
);
const CityMaster = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './CityMaster')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/User`} />
      <ProtectedRoute
              path={`${match.url}/User`}
              component={UserMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/adduser`} />
      <ProtectedRoute
              path={`${match.url}/adduser`}
              component={AddUser}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateUser`} />
      <ProtectedRoute
              path={`${match.url}/updateUser`}
              component={UpdateUser}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/Role`} />
      <ProtectedRoute
              path={`${match.url}/Role`}
              component={RoleMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addrole`} />
      <ProtectedRoute
              path={`${match.url}/addrole`}
              component={AddRole}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/Battery`} />
      <ProtectedRoute
              path={`${match.url}/Battery`}
              component={BatteryMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addbattery`} />
      <ProtectedRoute
              path={`${match.url}/addbattery`}
              component={AddBattery}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatebattery`} />
      <ProtectedRoute
              path={`${match.url}/updatebattery`}
              component={UpdateBattery}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/ev`} />
      <ProtectedRoute
              path={`${match.url}/ev`}
              component={EvMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addev`} />
      <ProtectedRoute
              path={`${match.url}/addev`}
              component={AddEv}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateev`} />
      <ProtectedRoute
              path={`${match.url}/updateev`}
              component={UpdateEv}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/bulkcharger`} />
      <ProtectedRoute
              path={`${match.url}/bulkcharger`}
              component={BulkChargerMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addbulkcharger`} />
      <ProtectedRoute
              path={`${match.url}/addbulkcharger`}
              component={AddBulkCharger}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatebulkcharger`} />
      <ProtectedRoute
              path={`${match.url}/updatebulkcharger`}
              component={UpdateBulkCharger}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fleetoperator`} />
      <ProtectedRoute
              path={`${match.url}/fleetoperator`}
              component={FleetMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addfleetoperator`} />
      <ProtectedRoute
              path={`${match.url}/addfleetoperator`}
              component={AddFleet}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatefleetoperator`} />
      <ProtectedRoute
              path={`${match.url}/updatefleetoperator`}
              component={UpdateFleet}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/owner`} />
      <ProtectedRoute
              path={`${match.url}/owner`}
              component={OwnerMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addowner`} />
      <ProtectedRoute
              path={`${match.url}/addowner`}
              component={AddOwner}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateowner`} />
      <ProtectedRoute
              path={`${match.url}/updateowner`}
              component={UpdateOwner}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/oem`} />
      <ProtectedRoute
              path={`${match.url}/oem`}
              component={OEMMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addoem`} />
      <ProtectedRoute
              path={`${match.url}/addoem`}
              component={AddOEM}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateoem`} />
      <ProtectedRoute
              path={`${match.url}/updateoem`}
              component={UpdateOem}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/swapping_station`} />
      <ProtectedRoute
              path={`${match.url}/swapping_station`}
              component={SwappingStationMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addswapping_station`} />
      <ProtectedRoute
              path={`${match.url}/addswapping_station`}
              component={AddSwappingStation}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updateswapping_station`} />
      <ProtectedRoute
              path={`${match.url}/updateswapping_station`}
              component={UpdateSwappingStation}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fault`} />
      <ProtectedRoute
              path={`${match.url}/fault`}
              component={FaultMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addfault`} />
      <ProtectedRoute
              path={`${match.url}/addfault`}
              component={AddFault}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/updatefault`} />
      <ProtectedRoute
              path={`${match.url}/updatefault`}
              component={UpdateFault}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/country`} />
      <ProtectedRoute
              path={`${match.url}/country`}
              component={CountryMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/state`} />
      <ProtectedRoute
              path={`${match.url}/state`}
              component={StateMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/city`} />
      <ProtectedRoute
              path={`${match.url}/city`}
              component={CityMaster}
              roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default Pages;
