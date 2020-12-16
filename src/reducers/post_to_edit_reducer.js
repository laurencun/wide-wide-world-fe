export default function postToEditReducer(state= [], action) {
    
        switch (action.type) {
            case "POST_TO_EDIT":
              return action.post
            case 'REVERT':
              return null
            default:
                 return state
        }
    }