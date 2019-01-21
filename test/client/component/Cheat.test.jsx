import React from 'react';
import { shallow } from 'enzyme';
import Cheat from '../../../web/src/components/container/Cheat';

const props = {
  cheat: { description: 'init repository', line: 'git init' },
  onAddToFavorite: jest.fn(() => {})
};
const wrapper = shallow(<Cheat {...props} />);

describe('Cheat Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
