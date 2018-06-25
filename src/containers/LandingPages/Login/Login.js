import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Form from 'components/Shared/Form/Form';
import Box from 'components/Shared/Box/Box';
import Tabs from 'components/Shared/Tabs/Tabs';
import logo from './images/logo.png';
import SignUp from './SignUp/SignUpWithData';
import SignIn from './SignIn/SignInWithData';

import styles from './login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [
        {
          id: 1,
          className: 'SignIn',
          name: 'Sign in'
        },
        {
          id: 2,
          className: 'SignUp',
          name: 'Sign up'
        },
      ],
      currentTab: 1
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab.id });
  }

  render() {
    return (
      <Box className={styles.Container} noMargin>
        <Helmet titleTemplate="Create your account" />
        <div className={styles.Wrapper}>
          <div className={styles.Card}>
            <div>
              <img
                className={styles.Logo}
                src={logo}
                alt="logo"
              />
              <h1 className={styles.Title}>AUDIOMAPPER</h1>
              <p className={styles.Slogan}>educate your travels</p>
            </div>
          </div>
          <div className={styles.FormContainer}>
            <Tabs
              className={styles.Tabs}
              disabledClass={styles.DisabledTab}
              currentTab={this.state.currentTab}
              tabs={this.state.tabList}
              changeTab={this.changeTab}
              withHash />
            <Form className={styles.Form}>
              { this.state.currentTab === 1 ? (
                <SignIn />
              ) : (
                <SignUp />
              )}
            </Form>
          </div>
        </div>
      </Box>
    );
  }
}

export default Login;
