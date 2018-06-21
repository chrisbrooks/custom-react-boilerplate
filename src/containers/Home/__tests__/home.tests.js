import React from 'react';
import { shallow } from 'enzyme';
import HomeComponent from '../Home';

let props;

beforeEach(() => {
  props = {
    toggleLeftSidebar: jest.fn(),
    getUserLocation: jest.fn()
  };
});

describe('<Home />', () => {
  it('should check the Default layout is rendered', () => {
    const wrapper = shallow(<HomeComponent {...props} />);
    expect(wrapper.find('.Container').length).toBe(1);
  });

  it('should test componentWillUnmount', () => {
    const wrapper = shallow(<HomeComponent {...props} />);
    wrapper.instance().componentDidMount();
    expect(props.toggleLeftSidebar).toHaveBeenCalled();
    expect(props.getUserLocation).toHaveBeenCalled();
  });
});
