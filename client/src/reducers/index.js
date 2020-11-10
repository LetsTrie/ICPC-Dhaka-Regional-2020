import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import admin from './admin'
import user from './user'
import { connectRouter } from 'connected-react-router'
import { adminReducer } from 'react-admin'
import { createHashHistory } from 'history'

const history = createHashHistory()
const root = combineReducers({
  admin: adminReducer,
  router: connectRouter(history),
  auth,
  profile,
  user, 
  admin
})

export default root