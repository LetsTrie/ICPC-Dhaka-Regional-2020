import {
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
  STORE_TOKEN,
  LOGOUT
} from './types';

const URL = 'http://localhost:5000/api/v1/auth';

export const loginAction = (body, history) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING_LOGIN });
  const jso = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const response = await jso.json();
  console.log(response);
  if (!response.success) {
    dispatch({
      type: AUTH_ERROR_LOGIN,
      message: response.message,
    });
  } else {
    console.log('very good');
    const { accessToken } = response;
    const TeamJson = await fetch(`${URL}/teamInformation`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const teamInfo = await TeamJson.json();
    console.log(teamInfo);
    if (teamInfo.success) {
      dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
      dispatch({
        type: STORE_TOKEN,
        payload: { accessToken, teamInfo: teamInfo.team },
      });
      history.push('/');
    } else {
      dispatch({
        type: AUTH_ERROR_LOGIN,
        message: teamInfo.message,
      });
    }
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
}