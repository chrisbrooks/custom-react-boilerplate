import React from 'react';
import { shallow } from 'enzyme';
import ShippingCalculator from '../ShippingCalculator';

describe('<ShippingCalculator />', () => {
  it('should check the Default layout is rendered', () => {
    const wrapper = shallow(<ShippingCalculator />);
    expect(wrapper.find('.grid__item').length).toBe(1);
  });
});
