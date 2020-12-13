export default function commentReducer(state= [], action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return action.comment
        default:
              return state
    }
}