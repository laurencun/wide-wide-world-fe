export default function savedReducer(state= [], action) {
    switch (action.type) {
        case 'ADD_TO_SAVED':
            console.log(action.saved)
            return action.saved
        default:
              return state
    }
}