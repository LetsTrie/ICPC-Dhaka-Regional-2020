const profileReducer = (state = {
  error: null,
  msg: '',
  user: null
}, action) => {
  switch (action.type) {
    case 'GET_STATE':
      return state
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: true,
        msg: action.payload
      }

    case 'UPDATE_PROFILE':
      console.log('[update]', action.payload)
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