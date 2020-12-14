import {Component} from 'react'
import Comment from './Comment'
import Like from './Like'
import {connect} from 'react-redux'
import {addComment} from '../actions/comment_actions'


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

    render(){

        console.log(this.props.post, 'in post component')

    return (
        <div>
            <span style={{fontWeight:'bold'}}>{this.props.post.user.username}</span><br/>
            <img width={500} src={this.props.post.image} alt={this.props.post.caption}/><br/>
            <span>{this.props.post.caption}</span><br/>
            <span style={{fontStyle:'italic'}}>{this.props.post.location}</span><br/>
            <span> <Like likes={this.props.post.likes}/> </span>
            <button onClick={() => this.props.addLikes(this.props.post, this.props.auth.user)}>like</button>
            <button onClick={()=> this.props.addToSaved(this.props.post, this.props.auth.user)}>save</button>
            <ul>
                {this.props.post.comments.map((commentArray, index) => <Comment key={index} comments={commentArray} />)}
            </ul>
            <form onSubmit={this.addComment}>
                <input onChange={this.handleChange} type='text' name='content' value={this.state.content} />    
                <button type='submit'>comment</button>
            </form>
        </div>
    )
}

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addComment})(Post)