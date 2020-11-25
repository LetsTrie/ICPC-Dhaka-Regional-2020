import {
  CONTACT_LOADING,
  CONTACT_ERROR,
  CONTACT_SUCCESSFUL,
  CONTACT_INIT,
} from '../action/types';

const initialState = {
  formSuccess: false,
  error: undefined,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTACT_INIT:
      return {
        ...initialState,
      };
    case CONTACT_LOADING:
      return {
        ...initialState,
        isLoading: true,
      };
    case CONTACT_ERROR:
      return {
        ...initialState,
        error: action.message,
      };
    case CONTACT_SUCCESSFUL:
      return {
        ...initialState,
        formSuccess: true,
      };
    default:
      return state;
  }
}
