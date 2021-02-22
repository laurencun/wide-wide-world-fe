import API from '../API.js'

const USER_URL = `${API}/users`

export const findUser = () => (dispatch, getState) => {
    //get all currennt user information including posts, likes, saveds
    fetch(USER_URL)
    .then(res => res.json())
    .then(users => 
        dispatch({
        type: 'USER',
        user: users.find(user => user.id === getState().auth.user.id)
    })
    )
}