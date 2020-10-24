import axios from 'axios'

export const register = data => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios.post('http://localhost:5000/api/v1/auth/register', data, config).then(res => {
      dispatch({
        type: 'REGISTER_ERROR'  ,
        payload: res.data
      })
  })
}

export const login = data => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios.post('http://localhost:5000/api/v1/auth/login', data, config).then(res => {
    const { status, msg } = res.data
    console.log(res.data)
    if (!status) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: msg
      })
    } else {
      dispatch({
        type: 'LOAD_USER',
        payload: res.data.data
      })
    }
  })
}

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: 'LOGOUT'
  })
}

export const upload = (data) => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
  console.log('action: ', data)
  axios.post('http://localhost:5000/api/v1/auth/upload', data, config).then(res => {
    console.log(res.data)
  })
}

export const setProfileError = () => (dispatch, getState) => {
  dispatch({
    type: 'SET_ERROR',
    payload: 'Please log in to continue'
  })
}

export const setUser = () => (dispatch, getState) => {
  const config = {
    headers: {
      "x-auth-token": localStorage.getItem('token')
    }
  }
  axios.get('http://localhost:5000/api/v1/profile/getUser', config).then(res => {
    console.log('[action]: ', res.data)
    dispatch({
      type: 'SET_USER',
      payload: res.data.user
    })
  })
}

export const updatePassword = data => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  }

  axios.post('http://localhost:5000/api/v1/profile/update/password', data, config).then(res => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    })
  })
}

export const updateEmail = data => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  }
  console.log(data)
  axios.post('http://localhost:5000/api/v1/profile/update/email', data, config).then(res => {
    console.log('[action/email]', res.data)
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    })
  })
}

export const updateProfile = data => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem('token')
    }
  }
  console.log(data)
  axios.post('http://localhost:5000/api/v1/profile/update/profile', data, config).then(res => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    })
  })
}