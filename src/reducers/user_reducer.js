//for future updates, not currently using

export default function userReducer(state=null, action) {
    switch(action.type){
        case 'USER':
            return action.user
        default : 
        return state }
    }