// Cheat Actions
export const RECEIVED_CATEGORIES = Symbol('RECEIVED_CATEGORIES');
export const INITIAL_CHEAT_STATE = Symbol('INITIAL_CHEAT_STATE');
export const FETCHING_CATEGORIES = Symbol('FETCHING_CATEGORIES');
export const SEARCH_COMPLETED = Symbol('SEARCH_COMPLETED');

// Cheat Favorite Actions
export const TOGGLE_LOVE_CHEAT = Symbol('TOGGLE_LOVE_CHEAT');
export const TOGGLE_LOVE_CHEAT_FAILURE = Symbol('TOGGLE_LOVE_CHEAT_FAILURE');

export const FETCHING_FAVORITE_CHEAT = Symbol('FETCHING_FAVORITE_CHEAT');
export const FETCH_FAVORITE_CHEAT_SUCCESS = Symbol('FETCH_FAVORITE_CHEAT_SUCCESS');
export const FETCH_FAVORITE_CHEAT_FAILURE = Symbol('FETCH_FAVORITE_CHEAT_FAILURE');

// User Actions
export const INITIAL_USER_STATE = Symbol('INITIAL_USER_STATE');
export const SIGNING_IN_USER = Symbol('SIGNING_IN_USER');
export const SIGNIN_SUCCESSFUL = Symbol('SIGNIN_SUCCESSFUL');
export const SIGNIN_FAILED = Symbol('SIGNIN_FAILED');
export const SIGNUP_SUCCESSFUL = Symbol('SIGNUP_SUCCESSFUL');
export const SIGNUP_FAILED = Symbol('SIGNUP_FAILED');
export const SIGNING_UP_USER = Symbol('SIGNING_UP_USER');
export const SIGNOUT_SUCCESSFULLY = Symbol('SIGNOUT_SUCCESSFULLY');
