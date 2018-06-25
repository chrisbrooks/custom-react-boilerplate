import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import getRoutes from 'routes';

const Root = ({
  store,
  client
}) => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Route component={getRoutes} path="/" />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};

export default Root;
