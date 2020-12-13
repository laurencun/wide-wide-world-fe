export default function savedReducer(state= [], action) {
    switch (action.type) {
        case 'ADD_TO_SAVED':
            return action.saved
        default:
              return state
    }
}