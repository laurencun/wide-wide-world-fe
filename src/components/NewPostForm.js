import React, { Component } from 'react'
import { connect } from 'react-redux';
import {new_post_success} from '../actions/post_actions';
import ImageUploader from "react-images-upload";

class NewPostForm extends Component {

    constructor(props){
    super(props)
    this.state = {
        user: this.props.auth.user,
        user_id: this.props.auth.user.id,
        image: '', 
        location: '',
        caption: ''
    }
    this.onDrop = this.onDrop.bind(this)
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          image: pictureFiles[0]
        }); 
      }
    

    handleChange = (event) => {
        {this.setState({
            [event.target.name]: event.target.value
        })}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.new_post_success(this.state)
        this.setState({
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
                    <ImageUploader
                            withIcon={true}
                            buttonText="Choose images"
                            onChange={this.onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                            maxFileSize={5242880}
                        />
                        {/* <input onChange={this.handleChange} type='file' name='image' accept="image/png, image/jpeg" />  */}
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
