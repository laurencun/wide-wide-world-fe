const BASE_URL = 'http://localhost:3000'
const POST_URL = `${BASE_URL}/posts`
const POST_TO_EDIT = 'POST_TO_EDIT'
const REVERT = 'REVERT'

export const postToEdit = (post) => dispatch => {
    fetch(`${POST_URL}/${post.id}`)
    .then(res => res.json())
    .then(post  => 
        dispatch({
        type: POST_TO_EDIT,
        post
    })
    )
}

export const revert = (post) => {
    return {type: REVERT, post}
}