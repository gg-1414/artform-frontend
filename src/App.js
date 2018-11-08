import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';
import Nav from './components/Nav'
import ArtsContainer from './containers/ArtsContainer'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import ArtistProfileContainer from './containers/ArtistProfileContainer'
import { fetchUser } from './redux/actioncreator'

class App extends Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.fetchUser(localStorage.token)
    }
  }

  render() {
    console.log('currentUser: ', this.props.currentUser);
    console.log('authCurrentUser: ', this.props.authCurrentUser);
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    authCurrentUser: state.authCurrentUser
  }
}

export default withRouter(connect(mapStateToProps, { fetchUser })(App));
