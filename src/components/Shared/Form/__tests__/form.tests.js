import React from 'react';
import { shallow } from 'enzyme';
import Form from '../Form';

describe('Form tests', () => {
  let props;

  beforeEach(() => {
    props = {
      className: 'blah',
      children: 'this is a child',
      onSubmit: jest.fn()
    };
  });

  it('should render heading, body and icon', () => {
    const component = shallow(<Form {...props} />);

    component.simulate('submit');

    expect(component.props().children).toEqual('this is a child');
    expect(component.props().className).toEqual('Form blah');
    expect(component.props().onSubmit).toBeCalled();
  });
});
