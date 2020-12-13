const BASE_URL = 'http://localhost:3000'
const COMMENT_URL = `${BASE_URL}/comments`
const ADD_COMMENT = 'ADD_COMMENT'


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