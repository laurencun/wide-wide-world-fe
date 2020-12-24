const BASE_URL = 'https://limitless-earth-02935.herokuapp.com'
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


export const addLikes = (post) =>  dispatch => {

    const like = {
      user_id: post.user.id,
      post_id: post.id
    }
  
    const reqObj = {
      method: 'POST',
      headers:{
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