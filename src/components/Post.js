import {Component} from 'react'
import Comment from './Comment'
import Like from './Like'
import {connect} from 'react-redux'
import {deletePost} from '../actions/post_actions'
import {addComment} from '../actions/comment_actions'
import {withRouter} from 'react-router-dom'
import { Button, Label, Icon } from 'semantic-ui-react'
import {fetchLikes} from '../actions/like_actions'

class Post extends Component {
    state = {
        content: ''
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

    componentDidMount () {
        this.props.fetchLikes(this.props.post.id)
    }

    render(){

    return (
        <>
    
            <Label attached='left' style={{fontWeight:'bold'}}>{this.props.post.user.username}</Label>

                {this.props.location.pathname === '/home' ?
            <div >
                {/* add conditional rendering to liked and saved buttons to change when user has liked or saved post */}
                <Button compact onClick={() => this.props.addLikes(this.props.post, this.props.auth.user)}><Icon name='like'/></Button>
                <Button compact onClick={()=> this.props.addToSaved(this.props.post, this.props.auth.user)}><Icon name='bookmark outline'/></Button>
            </div>
                 :<Button compact onClick={() => this.props.deletePost(this.props.post.id)}>delete</Button>}
            
            <img width={500} src={this.props.post.image} alt={this.props.post.caption}/><br/>
            
            <span>{this.props.post.caption}</span>
            
            <span style={{fontStyle:'italic'}}>{this.props.post.location}</span>
            
            <span> <Like key={this.props.post.id} 
                    likes={this.props.likes.filter(like => like.post_id === this.props.post.id)}/> 
            </span> <br/>
            
            <form onSubmit={this.addComment}>
                <input style={{padding:'5px'}} onChange={this.handleChange} type='text' name='content' value={this.state.content} />    
                <Button compact type='submit'>comment</Button>
            </form>
            
            <ul>
                {this.props.post.comments.map((commentArray, index) => <Comment key={index} comments={commentArray} />)}
            </ul>
        </>
    )
}

}

const mapStateToProps = state => ({
    comments: state.comments,
    likes: state.likes,
    auth: state.auth
})

export default connect(mapStateToProps, {addComment, fetchLikes, deletePost})(withRouter(Post))