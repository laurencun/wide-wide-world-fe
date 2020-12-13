import { combineReducers } from 'redux'
import post_reducer from './post_reducer'
import auth_reducer from './auth_reducer'

export default combineReducers({
    posts: post_reducer,
    auth: auth_reducer
})