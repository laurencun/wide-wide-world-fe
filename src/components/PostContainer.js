import React, { Component } from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import Navbar from './Navbar'
import NewPostForm from './NewPostForm'
import {fetchPosts, userPosts} from '../actions/post_actions'
import {addLikes} from '../actions/like_actions'
import {addToSaved} from '../actions/saved_actions'
import {currentUser, logoutUser} from '../actions/auth'
import {withRouter} from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'

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
    
          fetch('http://localhost:3000/current_user', reqObj)
          .then(resp => resp.json())
          .then(data => {
            this.props.currentUser(data)
          })
        }

        this.props.fetchPosts()

        if (window.location.href.split('/')[3] === 'profile') { 
            this.props.userPosts(this.props.auth.user.id)}
        // else if (window.location.href.split('/')[3] === 'saved') {
        //   this.props.savedPosts(this.props.auth.user.id)}
        else {return null}
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

    render() {

        return (
            <div>
                <Navbar logout={this.logout} showPostForm={this.showPostForm} showProfile={this.showProfile} showSaved={this.showSaved} showFeed={this.showFeed}/>
                {this.state.showForm === true ? 
                <NewPostForm />
                : null}

            <Grid verticalAlign='middle'columns={4}>
                        <Grid.Row >
                {this.props.posts.map (post => 
                <Grid.Column style={{border:'solid lightGrey 1px', display: 'flex',  justifyContent:'center', alignItems:'center'}}><Post key={post.id} post={post} user={post.user} comments={post.comments} likes={post.likes} addLikes={this.props.addLikes} addToSaved={this.props.addToSaved}/></Grid.Column>
                )}
            </Grid.Row>
        </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {addToSaved, addLikes, fetchPosts, userPosts, currentUser, logoutUser })(withRouter(PostContainer))