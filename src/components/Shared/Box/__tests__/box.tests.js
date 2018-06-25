import React from 'react';
import { shallow } from 'enzyme';
import Box from '../Box';

describe('<Box />', () => {

  let props;

  beforeEach(() => {
    props = {
      className: 'blah',
      children: 'this is some children',
      noMargin: true,
      noBottomPadding: true,
      noPadding: true,
      right: true
    };
  });

  it('should check correct classes are added', () => {

    const wrapper = shallow(<Box {...props} />);

    const noMargin = wrapper.find('.noMargin');
    const noBottomPadding = wrapper.find('.noBottomPadding');
    const noPadding = wrapper.find('.noPadding');
    const right = wrapper.find('.Right');

    expect(noMargin.length).toEqual(1);
    expect(noBottomPadding.length).toEqual(1);
    expect(noPadding.length).toEqual(1);
    expect(right.length).toEqual(1);
  });

});
