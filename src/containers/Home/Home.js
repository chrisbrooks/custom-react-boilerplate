import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './home.scss';

export class Home extends Component {
  componentDidMount() {
    this.props.getUserLocation();
    this.props.toggleLeftSidebar(true);
  }

  render() {

    const {
      leftSidebar,
      userLocation
    } = this.props;

    console.log(userLocation);
    console.log(leftSidebar);

    return (
      <div className={styles.Container}>
        sdsdsd
      </div>
    );
  }
}

Home.propTypes = {
  leftSidebar: PropTypes.bool,
  userLocation: PropTypes.object,
  getUserLocation: PropTypes.func,
  toggleLeftSidebar: PropTypes.func
};

export default Home;
