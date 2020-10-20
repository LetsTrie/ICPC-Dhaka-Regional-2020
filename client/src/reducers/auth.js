const authReducer = (state = {
  user: null,
  error: null,
  msg: ''
}, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      const { token, user } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      return {
        ...state,
        user: action.payload,
        error: false,
        msg: ''
      }

    case 'LOGIN_ERROR':
      console.log('login error')
      return {
        ...state,
        user: null,
        error: true,
        msg: action.payload
      }

    case 'LOGOUT':
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      console.log('logged out')
      return {
        ...state,
        user: null,
        error: false,
        msg: ''
      }

    default: 
    return state
  }
}

export default authReducer