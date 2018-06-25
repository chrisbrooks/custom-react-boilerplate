import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';

describe('<Header />', () => {

  let props;

  beforeEach(() => {
    props = {
      showLeftSidebar: jest.fn(),
      showRightSidebar: jest.fn(),
      leftSideBar: false,
      rightSideBar: false,
      avatar: 'http://image.com',
      firstName: 'Chris',
      isImpersonatingUser: false
    };
  });

  describe('LeftSidebar tests', () => {

    it('should render the header correctly', () => {
      const wrapper = shallow(<Header {...props} />);

      const header = wrapper.find('.Container');

      expect(header.length).toEqual(1);
    });

    it('should render first name text correctly with isImpersonatingUser', () => {
      let wrapper;
      let name;
      wrapper = shallow(<Header {...props} />);
      name = wrapper.find('span');
      expect(name.text()).toEqual('Chris');

      props.isImpersonatingUser = true;
      wrapper = shallow(<Header {...props} />);
      name = wrapper.find('span');
      expect(name.text()).toEqual('Chris (Impersonated)');
    });

    it('should add the correct classes when left and right sidebars are open', () => {
      props.leftSideBar = true;
      props.rightSideBar = true;
      const wrapper = shallow(<Header {...props} />);

      const leftSideBar = wrapper.find('.ContainerOpenLeft');
      const rightSideBar = wrapper.find('.ContainerOpenRight');
      const hamburger = wrapper.find('.HamburgerOpen');

      expect(leftSideBar.length).toEqual(1);
      expect(rightSideBar.length).toEqual(1);
      expect(hamburger.length).toEqual(1);
    });

    it('should trigger the click even to open the left sidebars', () => {
      const wrapper = shallow(<Header {...props} />);

      wrapper.find('.Hamburger').simulate('click');
      expect(props.showLeftSidebar).toHaveBeenCalled();
    });

    it('should trigger the click even to open the right sidebars', () => {
      const wrapper = shallow(<Header {...props} />);

      wrapper.find('.Account').simulate('click');
      expect(props.showRightSidebar).toHaveBeenCalled();
    });
  });

});
