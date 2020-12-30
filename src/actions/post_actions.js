const BASE_URL = 'https://limitless-earth-02935.herokuapp.com'
const POST_URL = `${BASE_URL}/posts`
const FETCH_POSTS = 'FETCH_POSTS'
const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
const USER_POSTS = 'USER_POSTS'
const SAVED_POSTS = 'SAVED_POSTS'
const DELETE_POST = 'DELETE_POST'
const SEARCH = 'SEARCH'
const UPDATED_POST = 'UPDATED_POST'
const FEATURED = 'FEATURED'


export const fetchPosts = () => dispatch => {
    fetch(POST_URL,  {mode: "no-cors"})
    .then(res => res.json())
    .then(posts => 
        dispatch({
        type: FETCH_POSTS,
        posts
    })
    )
}

export const new_post_success = (formObj) => dispatch => {

  const data = new FormData()
        Object.keys(formObj).forEach((key, value) => {
        data.append(key, formObj[key])
        })

    const reqObj = {
        method: 'POST',
        body: data
      }
  
      fetch(POST_URL, reqObj)
      .then(res => res.json())
      .then( newPost => 
        dispatch({
        type: NEW_POST_SUCCESS,
        newPost
      })
      )
}

export const updatePost = (formObj) => (dispatch, getState) => {

  const data = new FormData()
  Object.keys(formObj).forEach((key, value) => {
    data.append(key, formObj[key])
  })

  const reqObj = {
      method: 'PATCH',
      body: data
    }

    fetch(`${POST_URL}/${getState().post_to_edit.id}`, reqObj)
    .then(resp => resp.json()) 
    .then(updatedPost => 
      dispatch({
      type: UPDATED_POST,
      updatedPost
    })
    )
}

export const userPosts = () => (dispatch, getState) => {
  //filter posts published by current user
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
      dispatch({
      type: USER_POSTS,
      posts: posts.filter(post => post.user.id === getState().auth.user.id)
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
      posts: posts.filter(post => post.location.toLowerCase().includes(params.toLowerCase()) || post.caption.toLowerCase().includes(params.toLowerCase()))
    })
  )
}

export const savedPosts = () => (dispatch, getState) => {
  // filter posts saved by current user
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
    dispatch({
      type: SAVED_POSTS,
      posts: posts.filter(post => post.saveds.some(saved => saved.user_id === getState().auth.user.id))
    })
  )
}

export const featuredPosts = () => (dispatch) => {
  //sort most likes and limit 5
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
      dispatch({
      type: FEATURED,
      posts: posts.sort(function(postA, postB) {return postA.likes - postB.likes}).slice(0, )
  })
  )
}