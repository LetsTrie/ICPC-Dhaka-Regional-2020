import {
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
  STORE_TOKEN,
  ADMIN_STORE_TOKEN,
  LOGOUT,
} from './types';

const genPath = 'http://localhost:5000/api/v1'; // In general path

let originalUrl;
let resJson;

export const loginAction = (body, history, isAdmin = false) => async (
  dispatch
) => {
  dispatch({ type: AUTH_LOADING_LOGIN });
  originalUrl = isAdmin ? `${genPath}/admin/login` : `${genPath}/auth/login`;
  console.log(originalUrl);
  resJson = await fetch(originalUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const response = await resJson.json();
  console.log(response);
  if (!response.success) {
    console.log('Error Occurred!');
    console.log(response);
    dispatch({
      type: AUTH_ERROR_LOGIN,
      message: response.message,
    });
  } else {
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

    originalUrl = `${genPath}/auth/teamInformation`;
    const teamJson = await fetch(originalUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const teamInfo = await teamJson.json();
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
};
