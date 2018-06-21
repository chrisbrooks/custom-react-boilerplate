import { connect } from 'react-redux';

import HomeComponent from './Home';
import * as homeActions from './home.actions';

export default connect(
  state => ({
    leftSidebar: state.home.leftSidebar,
    userLocation: state.home.userLocation
  }),
  dispatch => ({
    toggleLeftSidebar: value => dispatch(homeActions.toggleLeftSidebar(value)),
    getUserLocation: () => dispatch(homeActions.getUserLocation())
  })
)(HomeComponent);
