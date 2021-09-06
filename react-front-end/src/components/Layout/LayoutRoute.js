import React from 'react';
import { Route } from 'react-router-dom';
import bgimage from 'assets/img/bg/loginbg.png';
const bgimagecss = {
  backgroundImage: `url("${bgimage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout style={bgimagecss}>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default LayoutRoute;
