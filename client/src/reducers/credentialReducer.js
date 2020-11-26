import {
  STORE_TOKEN,
  ADMIN_STORE_TOKEN,
  UPDATE_TEAM_PROFILE,
  LOGOUT
} from '../action/types';

const initialState = {
  accessToken: null,
  teamInfo: {},
  isAuthenticated: false,
  isAdmin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...initialState,
        accessToken: action.payload.accessToken,
        teamInfo: action.payload.teamInfo,
        isAuthenticated: true,
      };
    case ADMIN_STORE_TOKEN:
      return {
        ...initialState,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        isAdmin: true
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case UPDATE_TEAM_PROFILE: 
      return {
        ...state,
        teamInfo: action.team
      }
    default:
      return state;
  }
}
