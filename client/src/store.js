import { createStore, applyMiddleware } from 'redux'
import root from './reducers'
import thunk from 'redux-thunk'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createHashHistory } from 'history'

const history = createHashHistory()
const store = createStore(root, applyMiddleware(thunk, routerMiddleware(history)))

export default store

