import React, { Component } from 'react'
import {login_success} from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Featured from './Featured'
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'


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
      
          fetch('https://limitless-earth-02935.herokuapp.com/auth', reqObj)
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

           <div style={{marginTop:'20vh', justifyContent:'center', justifyItems:'center'}}>
              
                  {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
                  <Flex flexWrap='wrap' justifyContent='center'>
                  <Box  width={1} style={{border:'1px solid black', backgroundColor:'white', display:'flex', justifyContent:'center', justifyItems:'center'}}>
                      <form onSubmit={this.login}>
                      <h2>Share and Explore</h2><br/>
                          <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/><br/>
                          <input style={{padding:5}} onChange={this.handleChange} name='password' type='password' placeholder="Password" value={this.state.password}/><br/><br/>
                          <Button style={{padding:10, margin:10, color:'black'}} type='submit'>Enter</Button>
                          <Link to="/signup">Create Account</Link>
                      </form>
                  </Box>
                  
                <Featured/>
                </Flex>                
          </div>

        )
    }
}

const mapDispatchToProps = {
    login_success
}

export default connect(null, mapDispatchToProps)(Login)
