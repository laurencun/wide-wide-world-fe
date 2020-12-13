import React, { Component } from 'react'
import { logoutUser } from '../actions/auth'
import { connect } from 'react-redux';


class Navbar extends Component {

    
    render() {

        return (
            <div>
                <nav>
                    <ul>
                        <li>my profile</li>
                        <li onClick={this.props.showPostForm}>new post</li>
                        <li onClick={this.props.logout}>logout</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }
  
  
  export default connect(mapStateToProps, { logoutUser })(Navbar)
