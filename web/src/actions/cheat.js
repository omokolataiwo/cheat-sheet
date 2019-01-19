import Axios from 'axios';
import {
  FETCHING_CATEGORIES,
  RECEIVED_CATEGORIES,
  TOGGLE_LOVE_CHEAT,
  TOGGLE_LOVE_CHEAT_FAILURE,
  FETCHING_FAVORITE_CHEAT,
  FETCH_FAVORITE_CHEAT_SUCCESS,
  FETCH_FAVORITE_CHEAT_FAILURE,
  SEARCH_COMPLETED
} from './type';
import { BASE_URL } from '../const';

const fetchingCategoies = () => ({ type: FETCHING_CATEGORIES });
const receivedCategories = categories => ({ type: RECEIVED_CATEGORIES, categories });

const toggleFavorite = (categoryId, cheatId) => ({ type: TOGGLE_LOVE_CHEAT, categoryId, cheatId });

const fetchingFavoriteCheat = () => ({ type: FETCHING_FAVORITE_CHEAT });
const fetchFavoriteCheatsSuccess = favorite => ({ type: FETCH_FAVORITE_CHEAT_SUCCESS, favorite });
const fetchFavoriteCheatsFailure = () => ({ type: FETCH_FAVORITE_CHEAT_FAILURE });

const searchCompleted = searchResult => ({ type: SEARCH_COMPLETED, searchResult });

export const fetchAllCategoriesWithCheats = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    Axios.defaults.headers.common = { 'x-header-token': token };
  }

  dispatch(fetchingCategoies());
  return Axios.get(`${BASE_URL}/category`).then(({ data: { data } }) => {
    const { categories } = data;
    dispatch(receivedCategories(categories));
  });
};

const search = term => (category) => {
  const mCategory = { ...category };
  if (mCategory.title.toLowerCase().includes(term)) {
    return mCategory;
  }
  const cheats = mCategory.cheats.filter(
    cheat => cheat.description.toLowerCase().includes(term) || cheat.line.toLowerCase().includes(term)
  );
  mCategory.cheats = cheats;
  return mCategory;
};

export const searchSheetCheat = term => (dispatch, getState) => {
  if (term.length < 2) {
    return dispatch(searchCompleted(null));
  }

  const { categories } = getState().cheat;
  const searchResult = categories
    .map(search(term.toLowerCase()))
    .filter(category => !!category.cheats.length);
  return dispatch(searchCompleted(searchResult));
};

export const addToFavorite = cheatId => (dispatch, getState) => {
  const {
    user: { _id: userId }
  } = getState().user;

  return Axios.post(`${BASE_URL}/cheat/favorite`, { userId, cheatId })
    .then(({ data: { data: { category } } }) => {
      dispatch(toggleFavorite(category, cheatId));
    })
    .catch(() => dispatch({ type: TOGGLE_LOVE_CHEAT_FAILURE }));
};

export const fetchFavoriteCheats = () => (dispatch) => {
  Axios.defaults.headers.common = { 'x-header-token': localStorage.getItem('token') };
  dispatch(fetchingFavoriteCheat());
  return Axios.get(`${BASE_URL}/cheat/favorite`)
    .then(({ data: { data: cheats } }) => dispatch(fetchFavoriteCheatsSuccess(cheats)))
    .catch(() => dispatch(fetchFavoriteCheatsFailure()));
};
