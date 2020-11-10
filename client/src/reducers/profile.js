const profileReducer = (state = {
  error: null,
  msg: '',
  user: null
}, action) => {
  switch (action.type) {
    case 'RESET_PROFILE':
      return {
        ...state,
        error: null
      }
    
    case 'SET_USER':
      return {
        ...state,
        error: false,
        user: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: true,
        msg: action.payload
      }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        error: !action.payload.status,
        msg: action.payload.msg
      }

    default: 
      return state
  }
}

export default profileReducer