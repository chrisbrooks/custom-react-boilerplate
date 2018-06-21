import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';

import PostcodeLookup from '../PostcodeLookup';

let props;

beforeEach(() => {
  moxios.install();
  props = {
    apiUrl: 'https://api.system.snooze.com.au/staging/ecom/stores',
    phoneIcon: 'http://wwww.sdf.com/phone.svg'
  };
});

afterEach(() => {
  moxios.uninstall();
});

describe('<PostcodeLookup />', () => {
  it('should check the Default layout is rendered', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    expect(wrapper.find('.Container').length).toBe(1);
  });

  it('should check the showCallStore button is shown', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    wrapper.setState({
      showCallStore: true
    });
    expect(wrapper.find('Button').length).toBe(1);
    expect(wrapper.find('Button').props().secondary).toBe(true);

    wrapper.find('Button').simulate('click');
    expect(wrapper.find('.PostcodeForm').length).toBe(1);
  });

  it('should check the postcode input onChange event makes the correct state changes when a valid input value', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    wrapper.setState({
      showPostcodeForm: true,
      isValid: false
    });
    const mockedEvent = { target: {
      value: '1234'
    } };
    wrapper.find('.FindPostcodeField').simulate('change', mockedEvent);
    expect(wrapper.find('.FindPostcodeField').props().value).toEqual('1234');
    expect(wrapper.state().isValid).toEqual(true);
  });

  it('should check the postcode input onChange event makes the correct state changes when a invalid input value', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    wrapper.setState({
      showPostcodeForm: true,
      isValid: false
    });
    const mockedEvent = { target: {
      value: 'ffff'
    } };
    wrapper.find('.FindPostcodeField').simulate('change', mockedEvent);
    expect(wrapper.find('.FindPostcodeField').props().value).toEqual('ffff');
    expect(wrapper.state().isValid).toEqual(false);
  });

  it('should handle the form submission successful post request', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    wrapper.setState({
      loading: false,
      isValid: true,
      showPostcodeForm: true,
      postcode: '1111'
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: [
            {
              id: '840',
              name: 'Gepps Cross',
              telephone: '(08) 8162 5362',
            }
          ]
        }
      });
    });

    return wrapper.instance().handleSubmit()
      .then(() => {
        expect(wrapper.state().postcode).toEqual('');
        expect(wrapper.state().loading).toEqual(false);
        expect(wrapper.state().showPostcodeForm).toEqual(false);
        expect(wrapper.state().storeDetails).toEqual({
          name: 'Gepps Cross',
          telephone: '0881625362'
        });
      })
      .catch();
  });

  it('should handle the form submission unsuccessful post request', () => {
    const wrapper = shallow(<PostcodeLookup {...props} />);
    wrapper.setState({
      isValid: true,
      postcode: '3182',
      shippingEstimate: null
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400
      });
    });

    return wrapper.instance().handleSubmit()
      .then(() => {})
      .catch(() => {
        expect(wrapper.state().error).toEqual(true);
        expect(wrapper.state().loading).toEqual(false);
      });
  });

  it('should handle the form submission if not valid', () => {
    props.isValid = false;
    const wrapper = shallow(<PostcodeLookup {...props} />);
    expect(wrapper.instance().handleSubmit()).toEqual(false);
  });
});
