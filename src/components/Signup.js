import React, { Component } from 'react'
import {signup_success} from '../actions/auth';
import { connect } from 'react-redux';


class Signup extends Component {

    state = {
        username: '', 
        password: '',
        error: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    signup = event => {
        event.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
          }
      
          fetch('http://localhost:3000/users', reqObj)
          .then(resp => resp.json())
          .then(data => {
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.signup_success(data)
              localStorage.setItem('my_app_token', data.token)
              this.props.history.push('/home')
            }
          })
    }

    render() {

        return (
            <div style={{margin: '10vh'}}>
        {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
            <div style={{padding:50, align: 'center'}}>
                <h2>Sign up and start sharing!</h2>
                <form onSubmit={this.signup}>
                    <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/>
                    <input style={{padding:5}} onChange={this.handleChange} name='password' type='text' placeholder="Password" value={this.state.password}/><br/>
                    <input style={{margin:10}} type='submit' value='signup' />
                </form>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signup_success
}

export default connect(null, mapDispatchToProps)(Signup)