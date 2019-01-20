import cheat, { initialState } from '../../../web/src/reducers/cheat';
import {
  INITIAL_CHEAT_STATE,
  SEARCH_COMPLETED,
  TOGGLE_LOVE_CHEAT,
  FETCH_FAVORITE_CHEAT_SUCCESS,
  FETCHING_CATEGORIES,
  RECEIVED_CATEGORIES
} from '../../../web/src/actions/type';

const categories = [
  {
    _id: 1,
    title: 'Installation',
    cheats: [{ _id: 1, description: 'Init repository', line: 'git init' }]
  }
];

describe('Cheat Reducer', () => {
  it('should return default state', () => {
    expect(cheat(undefined, {})).toEqual({
      categories: [],
      favorite: [],
      searchResult: null,
      type: INITIAL_CHEAT_STATE
    });
  });

  it('should return search completed state', () => {
    expect(cheat(undefined, { type: SEARCH_COMPLETED, searchResult: categories })).toEqual({
      categories: [],
      favorite: [],
      searchResult: [
        {
          _id: 1,
          cheats: [{ _id: 1, description: 'Init repository', line: 'git init' }],
          title: 'Installation'
        }
      ],
      type: SEARCH_COMPLETED
    });
  });

  it('should return toggle love cheat state', () => {
    expect(
      cheat({ ...initialState, categories }, { type: TOGGLE_LOVE_CHEAT, categoryId: 1, cheatId: 1 })
    ).toEqual({
      categories: [
        {
          _id: 1,
          cheats: [
            {
              _id: 1,
              description: 'Init repository',
              favorite: true,
              line: 'git init'
            }
          ],
          title: 'Installation'
        }
      ],
      favorite: [],
      searchResult: null,
      type: TOGGLE_LOVE_CHEAT
    });
  });

  it('should return fetch favorite cheeat state', () => {
    expect(
      cheat(undefined, {
        type: FETCH_FAVORITE_CHEAT_SUCCESS,
        favorite: categories[0].cheats[0]
      })
    ).toEqual({
      categories: [],
      favorite: {
        _id: 1,
        description: 'Init repository',
        favorite: true,
        line: 'git init'
      },
      searchResult: null,
      type: FETCH_FAVORITE_CHEAT_SUCCESS
    });
  });

  it('should return fetching categories state', () => {
    expect(cheat(undefined, { type: FETCHING_CATEGORIES })).toEqual({
      categories: [],
      favorite: [],
      searchResult: null,
      type: FETCHING_CATEGORIES
    });
  });

  it('should return received categories state', () => {
    expect(cheat(undefined, { type: RECEIVED_CATEGORIES, categories })).toEqual({
      categories: [{
        _id: 1,
        cheats: [{
          _id: 1, description: 'Init repository', favorite: true, line: 'git init'
        }],
        title: 'Installation'
      }],
      favorite: [],
      searchResult: null,
      type: RECEIVED_CATEGORIES
    });
  });
});
