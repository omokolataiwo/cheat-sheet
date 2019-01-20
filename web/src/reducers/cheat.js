import {
  RECEIVED_CATEGORIES,
  INITIAL_CHEAT_STATE,
  FETCHING_CATEGORIES,
  TOGGLE_LOVE_CHEAT,
  FETCH_FAVORITE_CHEAT_SUCCESS,
  SEARCH_COMPLETED
} from '../actions/type';

export const initialState = {
  type: INITIAL_CHEAT_STATE,
  categories: [],
  searchResult: null,
  favorite: []
};

const toggleLove = (state, categoryId, cheatId) => {
  try {
    const category = state.categories.find(category => category._id === categoryId) || [];
    const cheat = category.cheats.find(cheat => cheat._id === cheatId);
    cheat.favorite = !cheat.favorite;
    return state.categories;
  } catch (error) {
    throw new Error('Unexpected error has occurred after we have toggled your cheat.');
  }
};

const cheat = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_COMPLETED:
      return { ...state, type: action.type, searchResult: action.searchResult };
    case TOGGLE_LOVE_CHEAT:
      // mutate global state categories
      return {
        ...state,
        type: action.type,
        categories: toggleLove(state, action.categoryId, action.cheatId)
      };
    case FETCH_FAVORITE_CHEAT_SUCCESS:
      return { ...state, type: action.type, favorite: action.favorite };
    case FETCHING_CATEGORIES:
      return { ...state, type: action.type };
    case RECEIVED_CATEGORIES:
      return { ...state, type: action.type, categories: action.categories };
    default:
      return state;
  }
};

export default cheat;
