const BASE_URL = 'http://localhost:3000'
const LIKES_URL = `${BASE_URL}/likes`
const ADD_LIKE = 'ADD_LIKE'


export const addLikes = (post, user) =>  dispatch => {
    // console.log(post, user)
  
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
        likes: post.likes.concat(like)
      })
      )
  }