import React, { Component } from 'react'
import {login_success} from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Featured from './Featured'
import {Box} from 'rebass'

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

           <div style={{display:'flex', justifyContent:'center', margin:'20vh'}}>
              <Box verticalAlign='center' style={{border:'solid lightGrey 1px', padding:'20px', margin:'20px'}}>
                  {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
                  <div style={{alignSelf:'center', marginTop:'200px'}}>
                      <form onSubmit={this.login}>
                      <h2>Welcome</h2><br/>
                          <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/><br/>
                          <input style={{padding:5}} onChange={this.handleChange} name='password' type='text' placeholder="Password" value={this.state.password}/><br/><br/>
                          <input style={{margin:10}} type='submit' value='login' />
                          <Link to="/signup">Create Account</Link>
                      </form>
                  </div>
                </Box>

                <Box style={{border:'solid lightGrey 1px', padding:'20px', margin:'20px'}}>
                <Featured/>
               </Box>
          </div>

        )
    }
}

const mapDispatchToProps = {
    login_success
}

export default connect(null, mapDispatchToProps)(Login)
