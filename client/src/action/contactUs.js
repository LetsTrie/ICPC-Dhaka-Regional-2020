import axios from 'axios';
import { CONTACT_ERROR, CONTACT_LOADING, CONTACT_SUCCESSFUL } from './types';

export const contactUsAction = (body) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_LOADING });
    const headers = { 'Content-Type': 'application/json' };
    await axios.post('/api/v1/contact', body, { headers });
    dispatch({ type: CONTACT_SUCCESSFUL });
  } catch (err) {
    const { message } = err.response.data;
    dispatch({ type: CONTACT_ERROR, message });
  }
};
