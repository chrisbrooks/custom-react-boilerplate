import React from 'react';
import { shallow } from 'enzyme';
import { LandingPageHeader } from '../LandingPageHeader';

describe('<LandingPageHeader />', () => {

  let props;

  beforeEach(() => {
    props = {
      login: false
    };
  });

  describe('LandingPageHeader tests', () => {

    it('should render the header correctly', () => {
      const wrapper = shallow(<LandingPageHeader {...props} />);
      expect(wrapper.find('header').length).toEqual(1);
    });

    it('should render the header correctly', () => {
      const wrapper = shallow(<LandingPageHeader {...props} />);
      expect(wrapper.find('.Login').length).toEqual(0);
    });

  });

});
