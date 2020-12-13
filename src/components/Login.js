import React, { Component } from 'react'
import {login_success} from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class Login extends Component {

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

    login = event => {
        event.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
          }
      
          fetch('http://localhost:3000/auth', reqObj)
          .then(resp => resp.json())
          .then(data => {
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              this.props.login_success(data)
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
                <h2>Welcome</h2>
                <form onSubmit={this.login}>
                    <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/>
                    <input style={{padding:5}} onChange={this.handleChange} name='password' type='text' placeholder="Password" value={this.state.password}/><br/>
                    <input style={{margin:10}} type='submit' value='login' />
                    <Link to="/signup">Create Account</Link>
                </form>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login_success
}

export default connect(null, mapDispatchToProps)(Login)
