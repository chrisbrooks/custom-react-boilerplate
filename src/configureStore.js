import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {

  /*
  * Use webpack's 'require.context' to traverse the project and grab all *.reducers.js files
  * Reducers can be located next to their related files
  */
  const reducers = {};
  const context = require.context('./', true, /^.*\.reducers.js/);
  context.keys().forEach((key) => {
    reducers[key.split('/').pop().replace('.reducers.js', '')] = context(key).default;
  });

  const reducer = combineReducers(reducers);
  const middleware = applyMiddleware(thunk);

  let store;
  if (process.env.NODE_ENV === 'development' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    // Redux DevTools browser extension support
    store = createStore(
      reducer,
      compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
  }
  else {
    store = createStore(reducer, compose(middleware));
  }

  if (module.hot) {
    module.hot.accept(context.id, () => {
      const reloadedContext = require.context('./', true, /^.*\.reducers.js/);
      reloadedContext.keys().forEach((key) => {
        reducers[key.split('/').pop().replace('.reducers.js', '')] = reloadedContext(key).default;
      });
      store.replaceReducer(combineReducers(reducers));
    });
  }

  return store;
};

export default configureStore;
