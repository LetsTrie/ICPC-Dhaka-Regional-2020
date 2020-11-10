const userReducer = (state = {
  navbar: null,
  error: null,
  msg: ''
}, action) => {
  switch (action.type) {
    case 'SET_NAVBAR':
      return {
        ...state,
        navbar: action.payload.data
      }

    case  'CONTACT_US':
      return {
        ...state,
        error: !action.payload.status,
        msg: action.payload.msg
      }

    default:
      return state
  }
}

export default userReducer