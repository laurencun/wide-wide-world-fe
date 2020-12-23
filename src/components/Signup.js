import React, { Component } from 'react'
import {signup_success} from '../actions/auth';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox'
import {Button} from 'rebass'
import '../App.css'


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
      
          fetch('http://limitless-earth-02935.herokuapp.com/users', reqObj)
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
        <div className='sign-up' style={{height:'100vh', width:'100vh'}}>

        <div style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
        {this.state.error ? <h4 style={{color: 'red'}}>{this.state.error}</h4> : null}
        <Flex flexWrap='wrap'>
            <Box style={{marginTop:'30vh', border:'1px solid black', backgroundColor:'white', display:'flex', justifyContent:'center', justifyItems:'center', padding:'20px'}}>
            
                <form onSubmit={this.signup}>
                <h2>Adventure Awaits...</h2>
                    <input style={{padding:5}} onChange={this.handleChange} name='username' type='text' placeholder="Username" value={this.state.username}/><br/>
                    <input style={{padding:5}} onChange={this.handleChange} name='password' type='password' placeholder="Password" value={this.state.password}/><br/>
                    <Button style={{padding:10, margin:10, color:'black'}} type='submit'>Sign Up</Button>
                </form>
            </Box>
          </Flex>
          </div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    signup_success
}

export default connect(null, mapDispatchToProps)(Signup)