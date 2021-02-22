import API from '../API.js'

const LIKES_URL = `${API}/likes`

export const fetchLikes = () => dispatch => {
  fetch(LIKES_URL)
  .then(res => res.json())
  .then(likes => 
    dispatch({
    type: 'FETCH_LIKES',
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
        type: 'ADD_LIKE',
        like: like
      })
      )
  }