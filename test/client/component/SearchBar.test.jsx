import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../../../web/src/components/container/SearchBar';

const props = {};
const wrapper = shallow(<SearchBar {...props} />);

describe('Search Bar Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
