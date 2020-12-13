export default function likeReducer(state= [], action) {
    switch (action.type) {
        case 'ADD_LIKE':
            return action.likes
        default:
              return state
    }
}