import { combineReducers } from 'redux'
import post_reducer from './post_reducer'
import auth_reducer from './auth_reducer'
import like_reducer from './like_reducer'
import saved_reducer from './saved_reducer'
import comment_reducer from './comment_reducer'

export default combineReducers({
    posts: post_reducer,
    auth: auth_reducer,
    like: like_reducer,
    saved: saved_reducer,
    comment: comment_reducer
})