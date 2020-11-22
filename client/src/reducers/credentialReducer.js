import { STORE_TOKEN, LOGOUT } from '../action/types';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  teamInfo: {},
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