import React, { Component } from 'react'
import {connect} from 'react-redux'
import Post from './Post'
import Navbar from './Navbar'
import NewPostForm from './NewPostForm'
import {fetchPosts} from '../actions/post_actions'
import {currentUser, logoutUser} from '../actions/auth'

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
        this.props.fetchPosts();
      }

      logout = () => {
        localStorage.removeItem('my_app_token')
        this.props.logoutUser()
        this.props.history.push('/')
    }


    showPostForm = () => {
      {this.state.showForm === false ? 
        this.setState({
          showForm : true
      })
      :this.setState({
          showForm : false
      })
      }
    }

    render() {

        return (
            <div>
                <Navbar logout={this.logout} showPostForm={this.showPostForm}/>
                {this.state.showForm === true ? 
                <NewPostForm />
                : null}
                {this.props.posts.map (post => 
                    <Post key={post.id} post={post} user={post.user} comments={post.comments} likes={post.likes}/>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {fetchPosts, currentUser, logoutUser })(PostContainer)