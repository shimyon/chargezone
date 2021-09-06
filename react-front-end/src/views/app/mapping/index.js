import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Evmapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Evmapping')
);
const AddEvmapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddEvmapping')
);
const Batterymapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Batterymapping')
);
const AddBatterymapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './AddBatterymapping')
);
const Chargermapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Chargermapping')
);
const Stationmapping = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Stationmapping')
);
const StationDetail = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './StationDetail')
);
const Mapping = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/evmapping`} />
      <ProtectedRoute
              path={`${match.url}/evmapping`}
              component={Evmapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addevmapping`} />
      <ProtectedRoute
              path={`${match.url}/addevmapping`}
              component={AddEvmapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/batterymapping`} />
      <ProtectedRoute
              path={`${match.url}/batterymapping`}
              component={Batterymapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/addbatterymapping`} />
      <ProtectedRoute
              path={`${match.url}/addbatterymapping`}
              component={AddBatterymapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/chargermapping`} />
      <ProtectedRoute
              path={`${match.url}/chargermapping`}
              component={Chargermapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/station`} />
      <ProtectedRoute
              path={`${match.url}/station`}
              component={Stationmapping}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/stationmapping`} />
      <ProtectedRoute
              path={`${match.url}/stationmapping`}
              component={StationDetail}
              roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Mapping;
