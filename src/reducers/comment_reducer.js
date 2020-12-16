export default function commentReducer(state= [], action) {
    switch (action.type) {
        case 'FETCH_COMMENTS':
            return action.comments
        case 'ADD_COMMENT':
            return [...state, action.comment]
        default:
              return state
    }
}