import React from 'react';
import { shallow } from 'enzyme';
import RenderTextInput from '../RenderTextInput';

describe('<RenderTextInput />', () => {

  let props;

  beforeEach(() => {
    props = {
      meta: {
        touched: true,
        error: 'this is an error',
      },
      type: 'text'
    };
  });

  it('should check the error messaging and classNames', () => {
    const wrapper = shallow(<RenderTextInput {...props} />);
    expect(wrapper.find('.has-error').length).toEqual(1);
    expect(wrapper.find('.error-message').length).toEqual(1);
    expect(wrapper.find('.error-message').props().children).toEqual('this is an error');
  });

  it('should check the input type is defined', () => {
    const wrapper = shallow(<RenderTextInput {...props} />);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('input').props().type).toEqual('text');
  });

  it('should check if label is rendered', () => {
    const wrapper = shallow(<RenderTextInput {...props} label="foo" />);
    expect(wrapper.find('label').text()).toEqual('foo');
  });

  it('should render guide', () => {
    const wrapper = shallow(<RenderTextInput {...props} guide="foo" />);
    expect(wrapper.find('.Guide').text()).toEqual('foo');
  });

  it('should render image', () => {
    const wrapper = shallow(<RenderTextInput {...props} image="foo.jpg" />);
    expect(wrapper.find('.Image').props().src).toEqual('foo.jpg');
  });

  it('should render Icon', () => {
    const wrapper = shallow(<RenderTextInput {...props} icon="exit" />);
    expect(wrapper.find('Icon').props().type).toEqual('exit');
  });

});
