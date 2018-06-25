import React from 'react';
import { shallow } from 'enzyme';
import App from 'containers/Layouts/App/App';

describe('<App />', () => {

  let props;

  beforeEach(() => {
    props = {
      showLeftSidebar: false,
      showRightSidebar: false,
      hideRightMenu: jest.fn(),
      hideLeftMenu: jest.fn(),
      resetStore: jest.fn(),
      match: {
        params: '/sites'
      },
      currentUser: {
        id: '33',
        accessLevel: 'ADMIN',
        firstName: 'Yogi',
        lastName: 'SKMM1',
        email: 'yogesh+skmm1@sidekicker.com.au',
        phone: '614828911',
        position: 'Management',
        avatar: 'https:s3-ap-southeast-2.amazonaws.com/dev.getsidekicker.com/users/33/c27dccc9ace0e0ea57e5373581667226.jpg',
        role: 'BUSINESS_SKMGT_SKMARKET',
        isSitesEnabled: true,
        isDocUploadEnabled: false,
        isImpersonatingUser: false,
        notificationPrefs: [
          'APPROVED',
          'NEW_COMMENT',
          'SIDEKICKER',
          'COMPLETED'
        ],
        company: {
          isInternalJobsOnly: false
        },
        sites: {
          count: 2
        },
        address: {
          line1: '33 Main Street',
          city: 'Santa Teresa',
          postcode: '0872',
          state: 'NT',
          country: 'Australia',
          latitude: -24.131387,
          longitude: 134.372552
        }
      }
    };
  });

  it('should check the Default layout is rendered', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('.Container').length).toBe(1);
  });

  it('should test componentWillUnmount', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.instance().componentWillUnmount();
    expect(props.resetStore).toHaveBeenCalled();
  });

  it('should test handleContentOnClick', () => {
    const wrapper = shallow(<App {...props} />);
    wrapper.instance().handleContentOnClick();
    expect(props.hideRightMenu).toHaveBeenCalled();
    expect(props.hideLeftMenu).toHaveBeenCalled();
  });

  it('should test componentWillReceiveProps', () => {

    const nextProps = {
      children: {
        props: {
          location: '/blah'
        }
      },
      currentUser: {
        id: '111',
        isImpersonatingUser: false
      }
    };

    props.children = {
      props: {
        location: '/sites'
      }
    };

    process.env.IS_GOOGLE_TAG_MANAGER_ENABLED = true;

    window.dataLayer = [];

    const wrapper = shallow(<App {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(props.hideRightMenu).toHaveBeenCalled();
    expect(props.hideLeftMenu).toHaveBeenCalled();
    expect(window.dataLayer).toEqual([{ userID: '111' }]);
  });
});
