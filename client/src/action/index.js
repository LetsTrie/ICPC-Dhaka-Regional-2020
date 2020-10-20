import axios from 'axios'

export const register = data => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  axios.post('http://localhost:5000/api/v1/auth/register', data, config).then(res => {
    console.log(res.data)
  })
}

export const login = data => async (dispatch, getState) => {
  console.log('reached')
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