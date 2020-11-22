import {
  AUTH_LOADING_LOGIN,
  AUTH_ERROR_LOGIN,
  AUTH_SUCCESSFUL_LOGIN,
} from './types';

export const loginAction = (body, history) => async (dispatch) => {
  console.log(body, history);
  // dispatch({ type: AUTH_LOADING_LOGIN });
  const URL = 'http://localhost:5000/api/v1/auth/login';
  const jso = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const response = await jso.json();
  console.log(response);
  // if (!response.success) {
  //   // show error message
  // } else {
  //   // save cred and go to my profile
  //   // dispatch({ type: AUTH_SUCCESSFUL_LOGIN });
  //   // const { accessToken, refreshToken } = data;
  //   // const userInfo = await fetch(`/api/v1/auth/view-profile`, {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     Authorization: `Bearer ${accessToken}`,
  //   //   },
  //   // });
  //   // const user = await userInfo.json();
  //   // if (user.success) {}
  //   // dispatch({
  //   //   type: TOKENS,
  //   //   payload: { accessToken, refreshToken, user: user.user },
  //   // });
  //   // history.push('/user/profile');
  // }
};
