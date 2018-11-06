import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
// import { connect, mapStateToProps } from 'react-redux'
import './App.css';
import Nav from './components/Nav'
import ArtsContainer from './containers/ArtsContainer'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

class App extends Component {
  state = {
    signUp: false
  }

  signUpHandler = (e) => {
    this.setState({signUp: true})
  }

  render() {

    return (
      <div className="App">
        <Nav />
        <Route path= '/login' component={LogIn} />
        <Route path= '/signup' component={SignUp} />
        <Route exact path= '/index' component={ArtsContainer} />
      </div>
    );
  }
}

export default withRouter(App);
