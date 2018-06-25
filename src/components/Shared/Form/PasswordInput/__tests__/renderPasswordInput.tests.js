import React from 'react';
import { shallow } from 'enzyme';
import RenderPasswordInput from '../RenderPasswordInput';

describe('<RenderPasswordInput />', () => {

  let props;

  beforeEach(() => {
    props = {
      meta: {
        touched: true,
        error: 'this is an error',
      }
    };
  });

  it('should check the error messaging and classNames', () => {
    const wrapper = shallow(<RenderPasswordInput {...props} />);
    expect(wrapper.find('.has-error').length).toEqual(1);
    expect(wrapper.find('.error-message').length).toEqual(1);
    expect(wrapper.find('.error-message').props().children).toEqual('this is an error');
  });

  it('should check the input type is defined', () => {
    const wrapper = shallow(<RenderPasswordInput {...props} />);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('input').props().type).toEqual('password');
  });

  it('should check if label is rendered', () => {
    const wrapper = shallow(<RenderPasswordInput {...props} label="foo" />);
    expect(wrapper.find('label').text()).toEqual('foo');
  });

  it('should render guide', () => {
    const wrapper = shallow(<RenderPasswordInput {...props} guide="foo" />);
    expect(wrapper.find('.Guide').text()).toEqual('foo');
  });

  it('should check the input type is changed onClick', () => {
    const wrapper = shallow(<RenderPasswordInput {...props} />);

    wrapper.find('.Toggle').simulate('click');
    expect(wrapper.find('input').props().type).toEqual('text');

    wrapper.find('.Toggle').simulate('click');
    expect(wrapper.find('input').props().type).toEqual('password');

  });

});
