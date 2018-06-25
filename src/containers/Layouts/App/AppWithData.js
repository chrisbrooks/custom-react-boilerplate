// import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import App from 'containers/Layouts/App/App';
import withUser from 'graphql/withUser';
// import * as appActions from './app.actions';

export default compose(withUser(({ viewer }) => ({
  currentUser: viewer.myself,
})))(App);
