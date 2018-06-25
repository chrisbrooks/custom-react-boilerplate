import React from 'react';
import { shallow } from 'enzyme';

import LandingPageHeader from 'components/Header/LandingPageHeader';
import LandingPageLayout from '../LandingPage';

describe('LandingPageLayout tests', () => {

  it('should check render of landingPage', () => {
    const wrapper = shallow(<LandingPageLayout />);
    expect(wrapper.find('.Container').length).toEqual(1);
  });

  it('should check render of landingPageHeader', () => {
    const wrapper = shallow(<LandingPageLayout />);
    expect(wrapper.find(LandingPageHeader).length).toEqual(1);
  });

  it('should check that children renders', () => {
    const wrapper = shallow(<LandingPageLayout />);
    expect(wrapper.find('.Content').text()).toEqual('');
  });

});
