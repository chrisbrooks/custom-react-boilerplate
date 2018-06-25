import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import BlockButton from 'components/Shared/Buttons/BlockButton/BlockButton';
import RenderTextInput from 'components/Shared/Form/TextInput/RenderTextInput';
import RenderPasswordInput from 'components/Shared/Form/PasswordInput/RenderPasswordInput';
import { password, required, maxLength, email } from 'utils/forms/validation/fieldValidation';
import { signIn } from 'utils/authorizationToken';

import styles from '../login.scss';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: 'password',
      isPostingData: false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({
      isPostingData: true
    });
    return this.props.login(values)
      .then((result) => {
        signIn(result.data.signin.token);
        this.setState({
          isPostingData: false
        });
        this.props.history.push('/home');
      });
  }

  render() {

    const {
      handleSubmit,
      pristine,
      valid,
    } = this.props;

    return (
      <div className={styles.FormWrapper}>
        <div className="margin-medium-bottom">
          <Field
            name="email"
            autocomplete="off"
            validate={[
              required('Contact email'),
              maxLength('Email'),
              email
            ]}
            placeholder="Enter your email address"
            label="Email address"
            type="text"
            component={RenderTextInput}
          />
        </div>
        <div className="margin-large-bottom">
          <Field
            name="password"
            autoComplete="off"
            type={this.state.inputType}
            validate={password}
            label="Password"
            placeholder="Enter your password"
            component={RenderPasswordInput} />
        </div>
        <BlockButton
          loading={this.state.isPostingData}
          primary
          disabled={!valid || pristine || this.state.isPostingData}
          onClick={handleSubmit(this.submitForm)}>
          Sign in
        </BlockButton>
      </div>
    );
  }
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  history: PropTypes.object,
  login: PropTypes.func,
  valid: PropTypes.bool
};

const withReduxForm = reduxForm({
  form: 'signInForm',
  // asyncValidate: asyncEmailValidator,
  // asyncBlurFields: ['email'],
  destroyOnUnmount: false,
  enableReinitialize: true
});

export default compose(
  withApollo,
  withReduxForm
)(withRouter(SignIn));
