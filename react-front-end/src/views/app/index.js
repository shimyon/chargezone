import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './pages')
);
const Dashboard = React.lazy(() =>
import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);
const Mapping = React.lazy(() =>
import(/* webpackChunkName: "viwes-gogo" */ './mapping')
);
const Operations = React.lazy(() =>
import(/* webpackChunkName: "viwes-gogo" */ './operations')
);
const Inventory = React.lazy(() =>
import(/* webpackChunkName: "viwes-gogo" */ './inventory')
);
const Reports = React.lazy(() =>
import(/* webpackChunkName: "viwes-gogo" */ './reports')
);
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/mapping`}
              render={(props) => <Mapping {...props} />}
            />
            <Route
              path={`${match.url}/operations`}
              render={(props) => <Operations {...props} />}
            />
            <Route
              path={`${match.url}/inventory`}
              render={(props) => <Inventory {...props} />}
            />
            <Route
              path={`${match.url}/report`}
              render={(props) => <Reports {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
