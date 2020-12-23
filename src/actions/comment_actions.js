const BASE_URL = 'http://limitless-earth-02935.herokuapp.com'
const COMMENT_URL = `${BASE_URL}/comments`
const ADD_COMMENT = 'ADD_COMMENT'
const FETCH_COMMENTS = 'FETCH_COMMENTS'

export const fetchComments = () => dispatch => {
  fetch(COMMENT_URL)
  .then(res => res.json())
  .then(comments => 
    dispatch({
    type: FETCH_COMMENTS,
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
        type: ADD_COMMENT,
        comment
      })
      )
  }