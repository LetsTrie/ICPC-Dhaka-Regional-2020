import { STORE_TOKEN, LOGOUT } from '../action/types';

const initialState = {
  accessToken: null,
  teamInfo: {},
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        accessToken: action.payload.accessToken,
        teamInfo: action.payload.teamInfo,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}