import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute, UserRole } from '../../../helpers/authHelper';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './start')
);
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <ProtectedRoute
              path={`${match.url}/start`}
              component={Start}
              roles={[UserRole.Operator]}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
