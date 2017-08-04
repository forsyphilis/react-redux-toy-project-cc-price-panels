
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import env from './env';

export default combineReducers({
    env,
    routing: routerReducer
})