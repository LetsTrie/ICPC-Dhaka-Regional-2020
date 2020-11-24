import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import admin from './admin'
import user from './user'
import { connectRouter } from 'connected-react-router'
import { adminReducer } from 'react-admin'
import { createHashHistory } from 'history';

import loginReducer from './loginReducer';
import credentialReducer from './credentialReducer';
import contactUsReducer from './contactUsReducer';

const history = createHashHistory()

export default combineReducers({
  admin: adminReducer,
  router: connectRouter(history),
  auth,
  profile,
  user, 
  admin,
  loginReducer,
  credentialReducer,
  contactUsReducer
});