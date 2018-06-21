import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeWithData from 'containers/Home/HomeWithData';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={HomeWithData}
    />
  </Switch>
);

export default Routes;
