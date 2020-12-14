export default function postReducer(state= [], action) {

let savedPosts;    

    switch (action.type) {
        case "FETCH_POSTS":
          return action.posts
        case 'USER_POSTS':
            return action.posts
        case 'SAVED_POSTS':
            savedPosts = action.saveds.map(saved => saved.post)
            // console.log(savedPosts)
            return savedPosts
        case 'NEW_POST_SUCCESS':
            return [...state, action.post]
        default:
             return state
    }
}