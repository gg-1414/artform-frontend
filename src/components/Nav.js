import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import '../stylesheets/Nav.css';
import { removeCurrentUser } from '../redux/actioncreator'

class Nav extends Component {
  handleLogOut = (e) => {
    localStorage.removeItem('token')
    this.props.removeCurrentUser()
  }

  loggedIn = () => {
    if(localStorage.token === 'undefined' || localStorage.token === undefined) {
      return (
        <Fragment>
          <span><Link to='/signup'>Sign Up</Link></span>
          <span><Link to='/login'>Log In</Link></span>
        </Fragment>
      )
    } else {
      return <span><Link to='/index' onClick={this.handleLogOut}>Log Out</Link></span>
    }
  }

  render() {
    console.log('current user: ', this.props.currentUser);
    return (
      <header>
        <nav>
          <h1>Artform</h1>
          {this.loggedIn()}
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

// const mapDispatchToProps = () => {
//   return {
//     removeCurrentUser: () => {dispatch(removeCurrentUser)}
//   }
// }

export default withRouter(connect(mapStateToProps, {removeCurrentUser})(Nav));
