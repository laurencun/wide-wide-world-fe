import {Component} from 'react'
import Comment from './Comment'
import Like from './Like'
import {connect} from 'react-redux'
import {deletePost} from '../actions/post_actions'
import {addComment} from '../actions/comment_actions'
import {withRouter} from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'
import {fetchLikes} from '../actions/like_actions'
import {fetchComments} from '../actions/comment_actions'
import {postToEdit} from '../actions/post_to_edit.actions'
import EditPostForm from './EditPostForm'
import {Box, Text} from 'rebass'
import API from '../API.js'

class Post extends Component {

    state = {
        content: '',
        showEditForm : false
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addComment = event => {
        event.preventDefault()
        const comment = {
            user_id: this.props.auth.user.id,
            post_id:  this.props.post.id,
            content: this.state.content
        }
        this.props.addComment(comment)
        this.setState({
            content: ''
        })
    }

    handleEdit = (post) => {
        this.showEditForm()
        this.props.postToEdit(post)
    }

    showEditForm = () => {
        { this.state.showEditForm === false ? 
          this.setState({
            showEditForm : true
        })
        : this.setState({
            showEditForm : false
        })
        }
      }

    componentDidMount () {
        this.props.fetchLikes()
        this.props.fetchComments()
    }



    render(){
        
        const photo_url = `${API}${this.props.post.image}`

    return (
        <>
        <Box Reflex style={{border:'solid lightGrey 1px', padding:'20px', margin:'20px'}}>
            {/* conditional rendering for post username and buttons for each post */}
            {this.props.location.pathname === '/home' || this.props.location.pathname === '/saved' ?
            <div >
                <Text style={{fontWeight:'bold'}}>{this.props.post.user ? this.props.post.user.username : this.props.auth.user.username}
                {/* add conditional rendering to liked and saved buttons to change when user has liked or saved post */}
                    <Button style={{float:'right'}} compact onClick={() => this.props.addLikes(this.props.post)}><Icon name='like'/></Button>
                    <Button style={{float:'right'}} compact onClick={()=> this.props.addToSaved(this.props.post)}><Icon name='bookmark outline'/></Button>
                </Text>
            </div>
            
                 :
            <div>
                <Button style={{float:'right'}} compact onClick={() => this.props.deletePost(this.props.post.id)}>delete</Button>
                <Button style={{float:'right'}} compact onClick={() => this.handleEdit(this.props.post)}>edit</Button>
            </div> 
            }
            
            <img width={300} src={photo_url} alt={this.props.post.caption}/><br/> 

            {this.state.showEditForm === true ? 
                <EditPostForm showEditForm={this.showEditForm}/>
                : null}
            
            <span>{this.props.post.caption}</span><br/>
            
            <span style={{fontStyle:'italic'}}>{this.props.post.location}</span>
            
            <span> <Like key={this.props.post.id} 
                    likes={this.props.likes.filter(like => like.post_id === this.props.post.id)}/> 
            </span>
            
            <form style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'15px'}} onSubmit={this.addComment}>
                <input style={{padding:'5px'}} onChange={this.handleChange} type='text' name='content' value={this.state.content} />    
                <Button compact type='submit'>comment</Button>
            </form>

            <div style={{justifyContent:'center', height: '110px', overflow: 'auto'}}>
               <Comment key={this.props.post.id} 
               comments={this.props.comments.filter(comments => comments.post_id === this.props.post.id)} />
            </div>
        </Box>
    </>
    )
}

}

const mapStateToProps = state => ({
    comments: state.comments,
    likes: state.likes,
    auth: state.auth
})

export default connect(mapStateToProps, {addComment, fetchLikes, fetchComments, deletePost, postToEdit})(withRouter(Post))