import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
const root = combineReducers({
  auth,
  profile
})

export default root