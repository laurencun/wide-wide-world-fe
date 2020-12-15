const BASE_URL = 'http://localhost:3000'
const POST_URL = `${BASE_URL}/posts`
const USER_URL = `${BASE_URL}/users`
const FETCH_POSTS = 'FETCH_POSTS'
const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
const USER_POSTS = 'USER_POSTS'
const SAVED_POSTS = 'SAVED_POSTS'
const DELETE_POST = 'DELETE_POST'
const SEARCH = 'SEARCH'


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
  
      fetch(POST_URL, reqObj)
      .then(resp => resp.json())
      .then(post => 
        dispatch({
        type: NEW_POST_SUCCESS,
        post
      })
      )
}

export const userPosts = (userId) => dispatch => {
  //filter posts published by current user
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
      dispatch({
      type: USER_POSTS,
      posts: posts.filter(post => post.user_id === userId)
  })
  )
}

export const deletePost = (postId) => dispatch => {

  fetch(`${POST_URL}/${postId}`, {method: 'DELETE'})
  .then(res => res.json())
  .then(post => 
      dispatch({
      type: DELETE_POST,
      post: post
  })
  )
}

export const searchPosts = (params) => dispatch => {
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
    dispatch({
      type: SEARCH,
      posts: posts.filter(post => post.location.includes(params) || post.caption.includes(params))
    })
  )
}

export const savedPosts = (userId) => dispatch => {
  // filter posts saved by current user
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
    dispatch({
      type: SAVED_POSTS,
      posts: posts.filter(post => post.saveds.some(saved => saved.user_id === userId))
    })
  )
}