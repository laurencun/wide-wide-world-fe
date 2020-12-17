import React, { Component } from 'react'
import { connect } from 'react-redux';
import {new_post_success} from '../actions/post_actions';

class NewPostForm extends Component {

    state = {
        user_id: '',
        image: '', 
        location: '',
        caption: ''
    }

    handleChange = (event) => {
        this.setState({
            user_id: this.props.auth.user.id,
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.new_post_success(this.state, this.props.auth.user)
        this.setState({
            user_id: '',
            image: '', 
            location: '',
            caption: ''
        })
        this.props.showPostForm()
    }

    render() {

        return (
            <div style={{margin: '10vh'}}>
                <div style={{padding:50, align: 'center'}}>
                    <h2>New Post</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input style={{padding:5}} onChange={this.handleChange} name='image' type='text' placeholder="Image" value={this.state.image}/><br/>
                        <input style={{padding:5}} onChange={this.handleChange} name='location' type='text' placeholder="Location" value={this.state.location}/><br/>
                        <input style={{padding:5}} onChange={this.handleChange} name='caption' type='text' placeholder="Caption" value={this.state.caption}/><br/>
                        <input style={{margin:10}} type='submit' value='submit' />
                    </form>
                </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    auth: state.auth
})

export default connect(mapStateToProps, {new_post_success})(NewPostForm)
