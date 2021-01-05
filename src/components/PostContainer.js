import React, { Component } from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import Navbar from './Navbar'
import NewPostForm from './NewPostForm'
import {fetchPosts, userPosts, savedPosts} from '../actions/post_actions'
import {addLikes} from '../actions/like_actions'
import {addToSaved} from '../actions/saved_actions'
import {currentUser, logoutUser} from '../actions/auth'
import {withRouter} from 'react-router-dom'
import {Flex} from 'rebass'
import API from '../API.js'

class PostContainer extends Component {

    state = {
        showForm : false
    }

    componentDidMount(){

        const token = localStorage.getItem('my_app_token')
    
        if (!token) {
          this.props.history.push('/')
        } else {
    
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

          if (window.location.href.split('/')[3] === 'profile') { 
            this.props.userPosts()}
          else if (window.location.href.split('/')[3] === 'saved') {
            this.props.savedPosts()}
          else
            {this.props.fetchPosts()}
          
        }
      
       
      }

      logout = () => {
        localStorage.removeItem('my_app_token')
        this.props.logoutUser()
        this.props.history.push('/')
    }


    showPostForm = () => {
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
      if (window.location.href.split('/')[3] === 'profile') { 
        return <h2>My Posts</h2>}
      else if (window.location.href.split('/')[3] === 'saved') {
        return <h2>Saved Posts</h2>}
      else {return <span>“NOT ALL THOSE WHO WANDER ARE LOST” ~ J.R.R. TOLKIEN</span>}
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
                <NewPostForm showPostForm={this.showPostForm}/>
                : null}
                </div>
            
                <div style={{margin:'30px', textAlign:'center'}}>{this.heading()}</div>

                <Flex flexWrap='wrap' justifyContent='center'>
                    {this.props.posts.map (post =>
                          <Post key={post.id}  
                                post={post} 
                                user={post.user} 
                                addLikes={this.props.addLikes} 
                                addToSaved={this.props.addToSaved}/>
                      )}
              </Flex>
              </>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {addToSaved, addLikes, fetchPosts, userPosts, currentUser, logoutUser, savedPosts})(withRouter(PostContainer))