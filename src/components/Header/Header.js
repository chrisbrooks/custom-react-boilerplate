import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { signOut } from 'utils/authorizationToken';
import logo from './images/logo1.png';
import profile from './images/profile.png';
import styles from './header.scss';

export const Header = ({
  firstName,
  history
}) => {

  const logout = () => {
    signOut();
    history.push('/login#signin');
  };

  return (
    <header className={styles.Container}>
      <div className={styles.LogoContainer}>
        <img
          className={styles.Logo}
          src={logo}
          alt="logo"
        />
        <p className={styles.Title}>Audiomapper</p>
        <p onClick={logout}>Logout</p>
      </div>
      { firstName &&
        <div className={styles.Account}>
          <p className={styles.User}>Hi, {firstName}</p>
          <img
            className={styles.Profile}
            src={profile}
            alt="profile"
          />
        </div>
      }
    </header>
  );
};

Header.propTypes = {
  firstName: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(Header);
