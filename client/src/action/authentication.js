import {
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
  STORE_TOKEN,
  ADMIN_STORE_TOKEN,
  LOGOUT,
} from './types';

import axios from 'axios';
let URL, headers;

export const loginAction = (body, history, isAdmin = false) => async (
  dispatch
) => {
  try {
    dispatch({ type: AUTH_LOADING_LOGIN });
    URL = isAdmin ? `/api/v1/admin/login` : `/api/v1/auth/login`;
    headers = { 'Content-Type': 'application/json' };
    const { data: response } = await axios.post(URL, body, { headers });
    
    const { accessToken } = response;
    if (isAdmin) {
      dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
      dispatch({
        type: ADMIN_STORE_TOKEN,
        payload: { accessToken },
      });
      history.push('/admin');
      return;
    }

    URL = `/api/v1/auth/teamInformation`;
    headers = {  Authorization: `Bearer ${accessToken}` }

    const { data: teamInfo } = await axios.get(URL, { headers });
    
    dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
    dispatch({
      type: STORE_TOKEN,
      payload: { accessToken, teamInfo: teamInfo.team },
    });
    history.push('/');
  } catch (err) {
    const { message } = err.response.data;
    dispatch({ type: AUTH_ERROR_LOGIN, message });
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
