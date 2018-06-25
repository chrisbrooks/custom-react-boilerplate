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

export class SignUp extends Component {
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
    return this.props.signUp(values)
      .then((result) => {
        signIn(result.data.signup.token);
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
            name="firstName"
            label="First name"
            validate={[
              required('First name'),
              maxLength('First name')
            ]}
            placeholder="Enter your first name"
            type="text"
            component={RenderTextInput}
          />
        </div>
        <div className="margin-medium-bottom">
          <Field
            name="lastName"
            label="Last name"
            validate={[
              required('Last name'),
              maxLength('Last name')
            ]}
            placeholder="Enter your last name"
            type="text"
            component={RenderTextInput}
          />
        </div>
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
            label="Create a password"
            placeholder="Create a password"
            component={RenderPasswordInput} />
        </div>
        <BlockButton
          loading={this.state.isPostingData}
          primary
          disabled={!valid || pristine || this.state.isPostingData}
          onClick={handleSubmit(this.submitForm)}>
          Sign up
        </BlockButton>
      </div>
    );
  }
}

SignUp.propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  pristine: PropTypes.bool,
  signUp: PropTypes.func,
  valid: PropTypes.bool
};

const withReduxForm = reduxForm({
  form: 'signUpForm',
  // asyncValidate: asyncEmailValidator,
  // asyncBlurFields: ['email'],
  destroyOnUnmount: false,
  enableReinitialize: true
});

export default compose(
  withApollo,
  withReduxForm
)(withRouter(SignUp));
