import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.M = {
  Modal: { init: () => {} },
  Sidenav: { init: () => {} }
};

configure({ adapter: new Adapter() });
