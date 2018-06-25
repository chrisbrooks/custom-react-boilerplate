import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppWithData from 'containers/Layouts/App/AppWithData';
import LandingPage from 'containers/Layouts/LandingPage/LandingPage';
import Login from 'containers/LandingPages/Login/Login';
import Home from 'containers/Home/Home';

const DefaultLayout = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={matchProps => (
      <AppWithData {...matchProps} {...rest}>
        <Component {...matchProps} {...rest} />
      </AppWithData>
    )
  } />
);

const LandingPageLayout = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={matchProps => (
      <LandingPage {...matchProps} {...rest}>
        <Component {...matchProps} {...rest} />
      </LandingPage>
    )
  } />
);

export default function getRoutes() {
  return (
    <Switch>
      <LandingPageLayout
        path="/login"
        component={Login} />
      <DefaultLayout
        path="/home"
        component={Home} />
    </Switch>
  );
}

DefaultLayout.propTypes = {
  component: PropTypes.func.isRequired
};

LandingPageLayout.propTypes = {
  component: PropTypes.func.isRequired
};
