import API from '../API.js'

const COMMENT_URL = `${API}/comments`

export const fetchComments = () => dispatch => {
  fetch(COMMENT_URL)
  .then(res => res.json())
  .then(comments => 
    dispatch({
    type: 'FETCH_COMMENTS',
    comments: comments
  })
  )
}

export const addComment = (comment) =>  dispatch => {

    const reqObj = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify(comment)
      }
      fetch(COMMENT_URL, reqObj)
      .then(res => res.json())
      .then(comment => 
        dispatch({
        type: 'ADD_COMMENT',
        comment
      })
      )
  }