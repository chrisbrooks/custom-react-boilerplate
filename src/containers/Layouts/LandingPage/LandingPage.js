import React from 'react';
import PropTypes from 'prop-types';

import ToastWrapper from 'components/Shared/Toast/ToastWrapper';

const LandingPageLayout = props => (
  <div>
    <ToastWrapper />
    { props.children }
  </div>
);

LandingPageLayout.propTypes = {
  children: PropTypes.object
};

export default LandingPageLayout;
