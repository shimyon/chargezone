import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Operator_dash = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Operator_dashboard')
);
const Admin_dash = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Admin_dashboard')
);
const Mgr_dash = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Mgr_dashboard')
);
const dashboard = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/operator`} />
      <ProtectedRoute
              path={`${match.url}/operator`}
              component={Operator_dash}
              roles={[UserRole.Operator]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
      <ProtectedRoute
              path={`${match.url}/admin`}
              component={Admin_dash}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/manager`} />
      <ProtectedRoute
              path={`${match.url}/manager`}
              component={Mgr_dash}
              roles={[UserRole.Manager]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default dashboard;
