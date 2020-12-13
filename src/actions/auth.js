const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const CURRENT_USER = 'CURRENT_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'


export const login_success = (user) => {
        return ({
        type: LOGIN_SUCCESS,
        user
    })
}

export const currentUser = (user) => {
    return ({
        type: CURRENT_USER,
        user
    })
}


export const logoutUser = () => {
    return {
      type: LOGOUT_USER
    }
  }

export const signup_success = (user) => {
    return ({
        type: SIGNUP_SUCCESS,
        user
    })
}