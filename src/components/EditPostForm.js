import React, { Component } from 'react'
import { connect } from 'react-redux';
import {updatePost} from '../actions/post_actions'
import {revert} from '../actions/post_to_edit.actions'
import { Box, Button } from 'rebass'

class EditPostForm extends Component {
 
    constructor(props){
    super(props)
        this.state = {
        location: '',
        caption: ''
        }
    }


    componentDidUpdate(prevProps, prevState){
        if (this.props.post_to_edit && prevState.location === '') {
            this.setState({
                location: this.props.post_to_edit.location,
                caption: this.props.post_to_edit.caption
            })
        }
    }

    handleChange = (event) => {
        if (event.target.name === 'image' && event.target.files) 
            this.setState({ image: event.target.files[0] });
        else {this.setState({
            [event.target.name]: event.target.value
        })}
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.updatePost(this.state)
        this.props.revert(this.state)
        this.setState({
            image: '', 
            location: '',
            caption: ''
        })
        this.props.showEditForm()
    }

    render() {
        return (
                <div style={{padding:50, align: 'center'}}>
                    <Box style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
                    <form onSubmit={this.handleSubmit}>
                        Location: <input style={{padding:5}} onChange={this.handleChange} name='location' type='text' placeholder="Location" value={this.state.location}/><br/>
                        Caption: <input style={{padding:5}} onChange={this.handleChange} name='caption' type='text' placeholder="Caption" value={this.state.caption}/><br/>
                        <Button style={{padding:10, margin:10, color:'black'}} type='submit'>Save</Button>
                    </form>
                    </Box>
                </div>
        )
    }
}

const mapStateToProps = state => ({
  post_to_edit: state.post_to_edit,
  auth: state.auth
})

export default connect(mapStateToProps, {updatePost, revert})(EditPostForm)