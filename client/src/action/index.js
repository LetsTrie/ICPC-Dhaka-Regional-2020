import axios from 'axios';

/*  -- User Level APIs, Controller: user.js --   */

export const getNavbar = () => (dispatch, getState) => {
  axios.get('/api/v1/user/getNavbar').then((res) => {
    dispatch({
      type: 'SET_NAVBAR',
      payload: res.data,
    });
  });
};

export const contactUs = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios.post('/api/v1/user/contactUs', data, config).then((res) => {
    dispatch({
      type: 'CONTACT_US',
      payload: res.data,
    });
  });
};

/*  -- Authentication APIs, Controller: auth.js --   */

export const register = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios.post('/api/v1/auth/register', data, config).then((res) => {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: res.data,
    });
  });
};

export const login = (data) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios.post('/api/v1/auth/login', data, config).then((res) => {
    const { status, msg } = res.data;
    if (!status) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: msg,
      });
    } else {
      dispatch({
        type: 'LOAD_USER',
        payload: res.data.data,
      });
    }
  });
};

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: 'LOGOUT',
  });
};

export const upload = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  axios.post('/api/v1/auth/upload', data, config).then((res) => {});
};

/*  -- User Profile APIs, Controller: profile.js --   */

export const setProfileError = () => (dispatch, getState) => {
  dispatch({
    type: 'SET_ERROR',
    payload: 'Please log in to continue',
  });
};

export const setUser = () => (dispatch, getState) => {
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  axios.get('/api/v1/profile/getUser', config).then((res) => {
    if (res.data.status) {
      dispatch({
        type: 'SET_USER',
        payload: res.data.user,
      });
    } else {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please log in to continue',
      });
    }
  });
};

export const updatePassword = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  axios.post('/api/v1/profile/update/password', data, config).then((res) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
  });
};

export const updateEmail = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  axios.post('/api/v1/profile/update/email', data, config).then((res) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
  });
};

export const updateProfile = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios.post('/api/v1/profile/update/profile', data, config).then((res) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data,
    });
  });
};

/*  -- Admin Level APIs, Controller: admin.js --   */

export const adminLogin = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch({
    type: 'GET_STATE',
    payload: '',
  });
  axios.post('/api/v1/admin/login', data, config).then((res) => {
    console.log(res.data);
    if (res.data.status) {
      dispatch({
        type: 'LOAD_USER',
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: res.data.msg,
      });
    }
  });
};

export const getAllUsers = () => (dispatch, getState) => {
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  axios.get('/api/v1/admin/getAllUsers', config).then((res) => {
    if (!res.data.status) {
      dispatch({
        type: 'ADMIN_ERROR',
        payload: res.data,
      });
    } else {
      dispatch({
        type: 'SET_ALL_USERS',
        payload: res.data,
      });
    }
  });
};

export const loadAdminGallery = () => (dispatch, getState) => {
  const config = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  axios.get('/api/v1/admin/load-gallery', config).then((res) => {
    if (!res.data.status) {
      dispatch({
        type: 'ADMIN_ERROR',
        payload: res.data,
      });
    } else {
      dispatch({
        type: 'LOAD_ADMIN_GALLERY',
        payload: res.data,
      });
    }
  });
};

export const adminUploadImage = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios.post('/api/v1/admin/upload-image', data, config).then((res) => {
    dispatch({
      type: 'UPDATE_GALLERY',
      payload: res.data,
    });
  });
};

export const adminUploadPDF = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios.post('/api/v1/admin/upload-pdf', data, config).then((res) => {
    console.log(res.data);
  });
};

export const adminUpdateImageVisibility = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios
    .post('/api/v1/admin/update-image-visibility', data, config)
    .then((res) => {
      console.log(res.data);
    });
};

export const adminUpdateSubmenu = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios.post('/api/v1/admin/update-submenu', data, config).then((res) => {});
};

export const clusterEmail = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };
  console.log(data);
  axios.post('/api/v1/admin/email', data, config).then((res) => {
    dispatch({
      type: 'EMAIL_RESPONSE',
      payload: res.data,
    });
  });
};

export const resetStates = (type) => (dispatch, getState) => {
  dispatch({ type });
};
