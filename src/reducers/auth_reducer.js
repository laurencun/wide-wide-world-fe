export default function authReducer(state=null, action) {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return action.user
        case 'CURRENT_USER':
            return action.user
        case 'LOGOUT_USER':
            return null
        case 'SIGNUP_SUCCESS':
            return action.user
        default:
            return state
    }
}