import axios from 'axios';
import { CONTACT_ERROR, CONTACT_LOADING, CONTACT_SUCCESSFUL } from './types';

export const contactUsAction = (body) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_LOADING });
    const headers = { 'Content-Type': 'application/json' };
    const res = await axios.post('/api/v1/contact', body, { headers });
    console.log(res.data.query_id)
    dispatch({ type: CONTACT_SUCCESSFUL, payload: res.data.query_id });
  } catch (err) {
    const { message } = err.response.data;
    dispatch({ type: CONTACT_ERROR, message });
  }
};
