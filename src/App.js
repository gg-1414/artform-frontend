import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
// import { connect, mapStateToProps } from 'react-redux'
import './App.css';
import Nav from './components/Nav'
import ArtsContainer from './containers/ArtsContainer'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import ArtistProfileContainer from './containers/ArtistProfileContainer'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Nav />
        <Route path= '/artist/profile' component={ArtistProfileContainer} />
        <Route path= '/login' component={LogIn} />
        <Route path= '/signup' component={SignUp} />
        <Route exact path= '/index' component={ArtsContainer} />
      </div>
    );
  }
}

export default withRouter(App);
