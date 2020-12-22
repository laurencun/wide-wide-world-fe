const BASE_URL = 'http://localhost:3000'
const POST_URL = `${BASE_URL}/posts`
const POST_TO_EDIT = 'POST_TO_EDIT'
const REVERT = 'REVERT'

export const postToEdit = (formObj) => dispatch => {

    const data = new FormData()
    Object.keys(formObj).forEach((key, value) => {
    data.append(key, formObj[key])
    })

    fetch(`${POST_URL}/${formObj.id}`)
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