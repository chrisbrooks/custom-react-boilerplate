import React from 'react';
import { shallow } from 'enzyme';
import Toast, { Type } from '../Toast';

describe('<Toast /> structural tests', () => {

  it('should render children', () => {
    const testString = 'Testing Children';
    const ToastComponent = shallow(<Toast><strong>{testString}</strong></Toast>);
    expect(ToastComponent.find('strong').text()).toEqual(testString);
  });

  it('should render an open container if show is set to true', () => {
    const ToastComponent = shallow(<Toast show>Success</Toast>);
    expect(ToastComponent.find('.ContainerOpen')).toHaveLength(1);
  });

  it('should render a container if show is set to false', () => {
    const ToastComponent = shallow(<Toast show={false}>Success</Toast>);
    expect(ToastComponent.find('.Container')).toHaveLength(1);
  });

  it('should render SUCCESS style if type is SUCCESS', () => {
    const ToastComponent = shallow(<Toast type={Type.SUCCESS}>Success</Toast>);
    expect(ToastComponent.find('.Toast.Success')).toHaveLength(1);
  });

  it('should render DANGER style if type is DANGER', () => {
    const ToastComponent = shallow(<Toast type={Type.DANGER}>Success</Toast>);
    expect(ToastComponent.find('.Toast.Danger')).toHaveLength(1);
  });
});

describe('<Toast /> behavioural tests', () => {

  it('should call dismiss after timeout', () => {
    jest.useFakeTimers();
    const dismiss = jest.fn();
    shallow(<Toast dismiss={dismiss} show />);
    jest.runAllTimers();
    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  it('should call dismiss when exit icon is clicked', () => {
    const dismiss = jest.fn();
    const toastComponent = shallow(<Toast dismiss={dismiss} show />);
    toastComponent.find('.Icon').simulate('click');
    expect(dismiss).toHaveBeenCalledTimes(1);
  });
});
