import React from 'react';
import ReactDOM from 'react-dom';
import createApolloClient from './createApolloClient';

import configureStore from './configureStore';
import Root from './root';

const client = createApolloClient();
const store = configureStore();

const render = (RootComponent) => {
  ReactDOM.render(<RootComponent store={store} client={client} />, document.getElementById('root'));
};

render(Root);

if (module.hot) {
  module.hot.accept('./root.js', () => {
    const NextRoot = require('./root.js').default;
    setTimeout(
      () => {
        render(NextRoot);
      },
      0
    );
  });
}
