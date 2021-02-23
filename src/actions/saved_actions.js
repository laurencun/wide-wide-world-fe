import API from '../API.js'

const SAVED_URL = `${API}/saveds`

export const addToSaved = (post, id) =>  dispatch => {
  
    const saved = {
      user_id: id,
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
        type: 'ADD_TO_SAVED',
        saved
      })
      )
  }