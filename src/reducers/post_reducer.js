export default function postReducer(state= [], action) {
    switch (action.type) {
        case "FETCH_POSTS":
          return action.posts
        case 'NEW_POST_SUCCESS':
            return [...state, action.post]
        default:
             return state
    }
}