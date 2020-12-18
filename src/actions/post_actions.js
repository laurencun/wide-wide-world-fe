const BASE_URL = 'http://localhost:3000'
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
    fetch(POST_URL)
    .then(res => res.json())
    .then(posts => 
        dispatch({
        type: FETCH_POSTS,
        posts
    })
    )
}

export const new_post_success = (post, user) => dispatch => {

  const newPost = {
    user_id: post.user_id,
    image: post.image, 
    location: post.location,
    caption: post.caption,
    user: user
  }

    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      }
  
      fetch(POST_URL, reqObj)
      .then(resp => resp.json())
      .then(newPost => 
        dispatch({
        type: NEW_POST_SUCCESS,
        newPost
      })
      )
}

export const updatePost = (post, user) => (dispatch, getState) => {

  const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: post.image,
        location: post.location,
        caption: post.caption,
        user: user
      })
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
      posts: posts.filter(post => post.user_id === getState().auth.user.id)
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
  //filter posts published by current user
  fetch(POST_URL)
  .then(res => res.json())
  .then(posts => 
      dispatch({
      type: FEATURED,
      posts: posts.filter(post => post.likes.length > 3)
  })
  )
}