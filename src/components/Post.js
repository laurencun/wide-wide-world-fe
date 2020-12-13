import {Component} from 'react'
import Comment from './Comment'
import Like from './Like'
import {connect} from 'react-redux'


class Post extends Component {

    render(){

    return (
        <div>
            <span style={{fontWeight:'bold'}}>{this.props.post.user.username}</span><br/>
            <img width={500} src={this.props.post.image} alt={this.props.post.caption}/><br/>
            <span>{this.props.post.caption}</span><br/>
            <span style={{fontStyle:'italic'}}>{this.props.post.location}</span><br/>
            <span> <Like likes={this.props.post.likes}/> </span>
            <ul>
                {this.props.post.comments.map((commentArray, index) => <Comment key={index} comments={commentArray} />)}
            </ul>
            <button onClick={() => this.props.addLikes(this.props.post, this.props.auth.user)}>like</button>
            <button onClick={()=> this.props.addToSaved(this.props.post, this.props.auth.user)}>save</button>
        </div>
    )
}

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Post)