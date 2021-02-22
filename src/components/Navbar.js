import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Dropdown, Input, Menu, Sticky} from 'semantic-ui-react'
import {searchPosts} from '../actions/post_actions'

class Navbar extends Component {

    state = {
        search: ''
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    search = event => {
        if (event.key === 'Enter'){
            //pass the search input to post action
        this.props.searchPosts(event.target.value)}
    }

    backHome = () => {
        this.props.history.push('/home')
    }

    render() {

        return (
            <div ref={this.contextRef}>
            <Sticky context={this.contextRef}>                 
                <Menu 
                attached='top'
                style={{ backgroundColor:'#ffbb33', paddingTop: '1em', fontFamily:'Playfair'}}>
                    <Menu.Item position="left" onClick={this.backHome}> <h2 style={{fontFamily: 'Major Mono Display, monospace'}}>Wide Wide World</h2> </Menu.Item>
                    <Menu.Item position="right">
                        <Input onKeyDown={this.search} onChange={this.handleChange} name='search' placeholder='Search...' value={this.state.search}/>
                    </Menu.Item>
                    <Dropdown.Menu>
                    {/* conditional rendering of appropriate menu options based on window location */}
                    {this.props.location.pathname === '/home' ?
                        <Dropdown.Item onClick={this.props.showProfile}>My Posts</Dropdown.Item>
                        :<><Dropdown.Item onClick={this.props.showFeed}>Back to Feed</Dropdown.Item>
                    {this.props.location.pathname === '/saved' ? 
                        <Dropdown.Item onClick={this.props.showProfile}>My Posts</Dropdown.Item>
                        :<Dropdown.Item onClick={this.props.showSaved}>Show Saved</Dropdown.Item>}
                        </>}
                        <Dropdown.Item onClick={this.props.showPostForm}>New Post</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Menu>
            </Sticky>
            </div>
        )
    }
}

export default connect(null, {searchPosts})(withRouter(Navbar))