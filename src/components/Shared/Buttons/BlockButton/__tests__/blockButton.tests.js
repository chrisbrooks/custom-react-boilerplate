import React from 'react';
import { shallow } from 'enzyme';
import BlockButton from '../BlockButton';

describe('<BlockButton />', () => {

  let props;

  beforeEach(() => {
    props = {
      className: null,
      style: null,
      primary: false,
      secondary: false,
      children: 'adfkahlakeha afaofnafna'
    };
  });

  it('should check classNames are correct with default props', () => {

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.className).toEqual('Button Secondary');

  });

  it('should check classNames are correct when setting className prop', () => {

    props.className = 'some-random-class';

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.className).toEqual('Button some-random-class Secondary');

  });

  it('should check the style prop', () => {

    props.style = {'background': 'red'};

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.style).toEqual({'background': 'red'});

  });

  it('should check the classNames when setting disabled as true', () => {

    props.disabled = true;

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.className).toEqual('Button Disabled');

  });

  it('should check the classNames when setting disabled as false and primary as true', () => {

    props.disabled = false;
    props.primary = true;

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.className).toEqual('Button Primary');

  });

  it('should check the classNames when setting loading as true', () => {

    props.loading = true;

    const wrapper = shallow(<BlockButton {...props} />);

    const prop = wrapper.find('button').props();

    expect(prop.className).toEqual('Button Secondary Loading');

  });

});
