const BASE_URL = 'http://localhost:3000'
const POST_URL = `${BASE_URL}/posts`
const FETCH_POSTS = 'FETCH_POSTS'
const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'

export const fetchPosts = () => dispatch => {
    fetch(POST_URL)
    .then(res => res.json())
    .then(posts => 
        dispatch({
        type: FETCH_POSTS,
        posts
    })
    )
}

export const new_post_success = (post) => dispatch => {
    
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }
  
      fetch('http://localhost:3000/posts', reqObj)
      .then(resp => resp.json())
      .then(post => dispatch({
        type: NEW_POST_SUCCESS,
        post
      })
      )
}