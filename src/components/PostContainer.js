import React, { Component } from 'react'
import {connect} from 'react-redux'

import Post from './Post'
import Navbar from './Navbar'
import NewPostForm from './NewPostForm'
import API from '../API.js'
import '../App.css'


import {fetchPosts, userPosts, savedPosts} from '../actions/post_actions'
import {addLikes} from '../actions/like_actions'
import {addToSaved} from '../actions/saved_actions'
import {currentUser, logoutUser} from '../actions/auth'
import {findUser} from '../actions/user_actions'
import {withRouter} from 'react-router-dom'

class PostContainer extends Component {

    state = {
        showForm : false
    }

    componentDidMount(){

        const token = localStorage.getItem('my_app_token')
    
        //if no JWT redirected back to login page
        if (!token) {
          this.props.history.push('/')
        } else {
        //retrieve the token and current user information
          const reqObj = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
    
          fetch(`${API}/current_user`, reqObj)
          .then(resp => resp.json())
          .then(data => {
            this.props.currentUser(data)
          })

          //make fetch request based on window location
          if (window.location.href.split('/')[3] === 'profile') { 
            this.props.userPosts()}
          else if (window.location.href.split('/')[3] === 'saved') {
            this.props.savedPosts(this.props.auth.user.id)}
          else
            {this.props.fetchPosts()
              this.props.findUser()}
          
        }
      
       
      }

      logout = () => {
        localStorage.removeItem('my_app_token')
        this.props.logoutUser()
        //redirect to login page after toekn removed
        this.props.history.push('/')
    }


    showPostForm = () => {
      //toggle showing new post form on click
      { this.state.showForm === false ? 
        this.setState({
          showForm : true
      })
      : this.setState({
          showForm : false
      })
      }
    }

    showProfile = () => {
        this.props.history.push('/profile')
    }

    showFeed = () => {
        this.props.history.push('/home')
    }

    showSaved = () => {
        this.props.history.push('/saved')
    }

    heading = () => {
      //conditional rendering for heading
      if (window.location.href.split('/')[3] === 'home') { 
      return <span>“NOT ALL THOSE WHO WANDER ARE LOST” ~ J.R.R. TOLKIEN</span>}
    }

    render() {

        return (
          <>
          
            <div>
                <Navbar logout={this.logout} 
                        showPostForm={this.showPostForm}  
                        showProfile={this.showProfile} 
                        showSaved={this.showSaved} 
                        showFeed={this.showFeed}/>
                
                {this.state.showForm === true ? 
                //render new post form if 'new post' has been clicked
                <NewPostForm showPostForm={this.showPostForm}/>
                : null}
                </div>
            
                <div style={{margin:'30px', textAlign:'center'}}>{this.heading()}</div>

                <div className='masonry' justifyContent='center' justifyItems='center'>
                    {this.props.posts.map (post =>
                          <Post key={post.id}  
                                post={post} 
                                user={post.user} 
                                addLikes={this.props.addLikes} 
                                addToSaved={this.props.addToSaved}/>
                      )}
              </div>
              </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {addToSaved, addLikes, fetchPosts, userPosts, currentUser, logoutUser, savedPosts, findUser})(withRouter(PostContainer))