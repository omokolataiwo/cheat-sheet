import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  searchSheetCheat,
  fetchAllCategoriesWithCheats,
  addToFavorite,
  fetchFavoriteCheats
} from '../../../web/src/actions/cheat';
import { BASE_URL } from '../../../web/src/const';
import {
  SEARCH_COMPLETED,
  FETCHING_CATEGORIES,
  RECEIVED_CATEGORIES,
  TOGGLE_LOVE_CHEAT,
  FETCH_FAVORITE_CHEAT_SUCCESS,
  FETCHING_FAVORITE_CHEAT
} from '../../../web/src/actions/type';

const mockStore = configureStore([thunk]);

describe('category', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should search cheat', (done) => {
    const expectedAction = {
      searchResult: [
        { cheats: [{ description: 'Initialize repository', line: 'git init' }], title: 'Install' }
      ],
      type: SEARCH_COMPLETED
    };
    const store = mockStore({
      cheat: {
        categories: [
          { title: 'Install', cheats: [{ description: 'Initialize repository', line: 'git init' }] }
        ]
      }
    });
    expect(store.dispatch(searchSheetCheat('repo'))).toEqual(expectedAction);
    done();
  });
  it('should fetch all categories with cheats', (done) => {
    moxios.stubRequest(`${BASE_URL}/category`, {
      status: 200,
      response: {
        data: {
          categories: [
            {
              cheats: [{ description: 'Initialize repository', line: 'git init' }],
              title: 'Install'
            }
          ]
        }
      }
    });
    const expectedAction = [
      { type: FETCHING_CATEGORIES },
      {
        categories: [
          { cheats: [{ description: 'Initialize repository', line: 'git init' }], title: 'Install' }
        ],
        type: RECEIVED_CATEGORIES
      }
    ];
    const store = mockStore();

    store.dispatch(fetchAllCategoriesWithCheats()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
  it('should add cheat as favorite', (done) => {
    moxios.stubRequest(`${BASE_URL}/cheat/favorite`, {
      status: 200,
      response: { data: { category: '232jj2dksdlk' } }
    });
    const expectedAction = [
      {
        categoryId: '232jj2dksdlk',
        cheatId: 'kslfd232l',
        type: TOGGLE_LOVE_CHEAT
      }
    ];
    const store = mockStore({ user: { user: { _id: '9sds2838ls' } } });

    store.dispatch(addToFavorite('kslfd232l')).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
  it('should fetch favorite cheats', (done) => {
    moxios.stubRequest(`${BASE_URL}/cheat/favorite`, {
      status: 200,
      response: {
        data: {
          cheats: [{ description: 'Initialize repository', line: 'git init' }]
        }
      }
    });
    const expectedAction = [
      { type: FETCHING_FAVORITE_CHEAT },
      {
        favorite: { cheats: [{ description: 'Initialize repository', line: 'git init' }] },
        type: FETCH_FAVORITE_CHEAT_SUCCESS
      }];
    const store = mockStore();

    store.dispatch(fetchFavoriteCheats()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
