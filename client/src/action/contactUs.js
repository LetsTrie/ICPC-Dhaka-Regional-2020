import { CONTACT_ERROR, CONTACT_LOADING, CONTACT_SUCCESSFUL } from './types';

let originalUrl;
let resJson;

const genPath = 'http://localhost:5000/api/v1'; // In general path

export const contactUsAction = (body) => async (dispatch) => {
  dispatch({ type: CONTACT_LOADING });
  originalUrl = `${genPath}/contact`;

  resJson = await fetch(originalUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const response = await resJson.json();
  if (!response.success) {
    console.log('Error Occurred!');
    console.log(response);
    dispatch({
      type: CONTACT_ERROR,
      message: response.message,
    });
  } else {
    console.log('Yo')
    dispatch({ type: CONTACT_SUCCESSFUL });
  }
};
