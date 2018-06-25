import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import get from 'lodash.get';

import { Type } from 'components/Shared/Toast/Toast';
import * as toastActions from 'components/Shared/Toast/toast.actions';
import SIGN_UP_MUTATION from './graphql/signUpMutation.graphql';
import SignUpComponent from './SignUp';

const withCreateMutation = graphql(SIGN_UP_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    signUp: user => (
      mutate({
        variables: {
          user
        }
      })
        .then(response => (
          response
        ))
        .catch((error) => {
          ownProps.showToast(
            Type.DANGER,
            get(error, 'graphQLErrors[0].message', 'An error occurred while signing up for an account')
          );
        })
    )
  })
});

const withRedux = connect(
  null,
  dispatch => ({
    ...bindActionCreators(toastActions, dispatch)
  })
);

export default compose(
  withRedux,
  withCreateMutation
)(SignUpComponent);
