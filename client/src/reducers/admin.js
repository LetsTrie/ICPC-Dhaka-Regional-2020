const adminReducer = (state = {
  error: null,
  msg: '',
  users: [],
  participantCount: null,
  gallery: null
}, action) => {
  switch (action.type) {
    case 'SET_ALL_USERS':
      return {
        ...state,
        users: action.payload.users,
        error: false,
        participantCount: action.payload.participantCount
      }

      case 'LOAD_ADMIN_GALLERY':
        console.log('[red]', action.payload)
        return {
          ...state,
          error: false,
          gallery: action.payload.gallery
        }

    case 'UPDATE_GALLERY':
      return {
        ...state,
        gallery: action.payload.gallery,
        error: !action.payload.status,
        msg: action.payload.msg
      }

    case 'EMAIL_RESPONSE':
      return {
        ...state,
        error: !action.payload.status,
        msg: action.payload.msg
      }

    case 'ADMIN_ERROR':
      return {
        ...state,
        error: true,
        msg: action.payload.msg
      }

    case 'RESET_ADMIN': 
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}

export default adminReducer