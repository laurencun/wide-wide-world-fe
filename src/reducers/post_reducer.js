export default function postReducer(state= [], action) {

// let mySaves;    
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
        // case 'SAVED_POSTS':
        //     // savedPosts = action.saveds.map(saved => saved.post)
        //     console.log(mySaves)
        //     return mySaves
        case 'NEW_POST_SUCCESS':
            return [...state, action.post]
        default:
             return state
    }
}