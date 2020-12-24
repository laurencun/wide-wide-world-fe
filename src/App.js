import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { currentUser } from './actions/auth'
import Login from './components/Login';
import Signup from './components/Signup';
import PostContainer from './components/PostContainer';
import Profile from './components/Profile';
import Saved from './components/Saved';
import { connect } from 'react-redux'
import './App.css'


class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('my_app_token')

    if (!token) {
      this.props.history.push('/')
    } else {

      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      fetch('http://limitless-earth-02935.herokuapp.com//current_user', reqObj)
      .then(resp => resp.json())
      .then(data => {
        this.props.currentUser(data)
      })
    }
  }

  render(){

  return (
    <div>
      <Router>
        <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/home' component={PostContainer}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/saved' component={Saved}/>
        </Switch>
      </Router>
    </div>
  );
  }
}

export default connect(null, {currentUser})(withRouter(App))
