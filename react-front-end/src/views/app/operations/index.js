import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Transaction = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Transaction')
);
const Queue = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './Queue')
);
const Operations = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/transaction`} />
      <ProtectedRoute
              path={`${match.url}/transaction`}
              component={Transaction}
              roles={[UserRole.Admin]}
      />
      <Redirect exact from={`${match.url}/`} to={`${match.url}/queue`} />
      <ProtectedRoute
              path={`${match.url}/queue`}
              component={Queue}
              roles={[UserRole.Admin]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Operations;
