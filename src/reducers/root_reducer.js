import { combineReducers } from 'redux'
import post_reducer from './post_reducer'
import auth_reducer from './auth_reducer'
import like_reducer from './like_reducer'
import saved_reducer from './saved_reducer'
import comment_reducer from './comment_reducer'
import post_to_edit_reducer from './post_to_edit_reducer'

export default combineReducers({
    posts: post_reducer,
    auth: auth_reducer,
    likes: like_reducer,
    saved: saved_reducer,
    comments: comment_reducer,
    post_to_edit: post_to_edit_reducer
})