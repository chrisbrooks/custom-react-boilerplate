import React from 'react';
import { shallow } from 'enzyme';

import Title from '../Title';

describe('<Title/> structural tests', () => {

  it('should render children', () => {
    const children = 'Oh Hai!';
    const wrapper = shallow(<Title>{children}</Title>);
    expect(wrapper.props().children).toEqual(children);
  });

  it('should render h2 with className Title', () => {
    const wrapper = shallow(<Title>oh hai!</Title>);
    expect(wrapper.find('h2.Title')).toHaveLength(1);
  });
});
