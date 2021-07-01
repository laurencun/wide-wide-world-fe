import React, { Component } from 'react'
import {login_success} from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Featured from './Featured'
import { Button } from 'rebass'
import { Flex, Box } from 'reflexbox'
import API from '../API.js'

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
      
          fetch(`${API}/auth`, reqObj)
          .then(resp => resp.json())
          .then(data => {
            if (data.error) {
              this.setState({
                error: data.error
              })
            } else {
              //pass the user credentials to post action
              this.props.login_success(data)
              // set the local storage to contain JWT
              localStorage.setItem('my_app_token', data.token)
              // redirect user to home page after login
              this.props.history.push('/home')
            }
          })
    }

    render() {

        return (

           <div class="login" style={{justifyContent:'center', justifyItems:'center'}}>
              <h1 style={{fontFamily: 'Major Mono Display, monospace'}} >Wide Wide World</h1> 
              
                  {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
                  
                  <Flex flexWrap='wrap' justifyContent='center' border="1px" solid="black" height="100%" >

                  <Box><h2 style={{padding:'20px', width:'80vw', textAlign: 'center', fontFamily:'Playfair'}}>Welcome to Wide Wide World, a visual forum for seekers of international exploration. You don't have to be a professional photographer to share your adventures. Create a new account or sign-in below to treat yourself to a virtual vacation or share a recent experience.</h2></Box>
                  
                  <Box style={{border:'1px solid black', backgroundColor:'#fff', justifyContent:'center', justifyItems:'center', textAlign:'center', height:'fit-content', width:'100vw'}}>
                      <form onSubmit={this.login}>
                          <div style={{paddingTop:'20px'}}>                     
                          <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/><br/>
                          <input style={{padding:5}} onChange={this.handleChange} name='password' type='password' placeholder="Password" value={this.state.password}/><br/><br/>
                          </div> 
                          <Button style={{padding:10, margin:10, color:'black'}} type='submit'>Enter</Button>

                          <Link to="/signup" style={{fontFamily: 'Playfair', textDecoration: 'underline', color:'black'}}>Create Account</Link>
                      
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