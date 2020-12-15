export default function postReducer(state= [], action) {
 
let updatedPosts

    switch (action.type) {
        case "FETCH_POSTS":
          return action.posts
        case 'USER_POSTS':
            return action.posts
        case 'DELETE_POST':
            updatedPosts = state.filter(p => p.id !== action.post.id)
            return updatedPosts
        case 'SEARCH':
            return action.posts
        case 'SAVED_POSTS':
            return action.posts
        case 'NEW_POST_SUCCESS':
            return [...state, action.post]
        default:
             return state
    }
}