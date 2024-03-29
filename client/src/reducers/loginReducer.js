import {
  AUTH_LOGIN_INIT,
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
} from '../action/types';

const initialState = {
  isLoading: false,
  error: undefined,
  formSuccess: false,
  teams: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_INIT:
      return {
        ...initialState,
      };
    case AUTH_LOADING_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_ERROR_LOGIN:
      return {
        ...initialState,
        error: action.message,
      };
    case AUTH_SUCCESSFUL_LOGIN:
      return {
        ...initialState,
        formSuccess: true,
      };
    default:
      return state;
  }
}