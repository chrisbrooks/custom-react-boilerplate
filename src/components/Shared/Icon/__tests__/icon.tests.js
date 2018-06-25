import React from 'react';
import { shallow } from 'enzyme';
import Icon from '../Icon';

describe('Form tests', () => {
  let props;

  beforeEach(() => {
    props = {
      type: 'exit',
      className: 'icons'
    };
  });

  it('should render heading, body and icon', () => {
    const component = shallow(<Icon {...props} />);
    expect(component.props().className).toEqual('Icon exit icons');
    expect(component.props()['data-icon']).toEqual('exit');
  });
});
