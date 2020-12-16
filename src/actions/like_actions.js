const BASE_URL = 'http://localhost:3000'
const LIKES_URL = `${BASE_URL}/likes`
const ADD_LIKE = 'ADD_LIKE'
const FETCH_LIKES = 'FETCH_LIKES'

export const fetchLikes = () => dispatch => {
  fetch(LIKES_URL)
  .then(res => res.json())
  .then(likes => 
    dispatch({
    type: FETCH_LIKES,
    likes: likes
  })
  )
}


export const addLikes = (post, user) =>  dispatch => {

    const like = {
      user_id: user.id,
      post_id: post.id}
  
    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(like)
      }

      fetch(LIKES_URL, reqObj)
      .then(res => res.json())
      .then(like => 
        dispatch({
        type: ADD_LIKE,
        like: like
      })
      )
  }