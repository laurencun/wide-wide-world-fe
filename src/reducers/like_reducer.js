export default function likeReducer(state= [], action) {
    switch (action.type) {
        case 'FETCH_LIKES':
            return action.likes
        case 'ADD_LIKE':
            return [...state, action.like]
        default:
              return state
    }
}