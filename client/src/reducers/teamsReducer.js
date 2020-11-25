import {
  ADMIN_TEAMS,
} from '../action/types';

const initialState = {
  teams: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ADMIN_LOGIN:
      return {
        teams: action.payload,
      };
    default:
      return state;
  }
}