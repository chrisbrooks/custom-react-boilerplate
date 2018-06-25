/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import finallyShim from 'promise.prototype.finally';

import ToastWrapper from 'components/Shared/Toast/ToastWrapper';
import Header from 'components/Header/Header';

import styles from './app.scss'

finallyShim.shim();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { currentUser } = this.props;

    const headerWithProps = (<Header
      firstName={currentUser && currentUser.firstName} />);

    return (
      <div className={styles.Container}>
        <Helmet titleTemplate="%s | Sidekicker" />
        <ToastWrapper />
        {headerWithProps}
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.object
};

export default App;
