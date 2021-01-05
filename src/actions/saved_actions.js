import API from '../API.js'

const BASE_URL = `${API}`
const SAVED_URL = `${BASE_URL}/saveds`
const ADD_TO_SAVED = 'ADD_TO_SAVED'


export const addToSaved = (post) =>  dispatch => {
    // console.log(post, user)
  
    const saved = {
      user_id: post.user.id,
      post_id: post.id}
  
    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(saved)
      }
      fetch(SAVED_URL, reqObj)
      .then(res => res.json())
      .then(saved => 
        dispatch({
        type: ADD_TO_SAVED,
        saved
      })
      )
  }