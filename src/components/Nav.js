import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import '../stylesheets/Nav.css';

class Nav extends Component {
  loggedIn = () => {
    if(this.props.currentUser === null) {
      return (
        <Fragment>
          <span><Link to='/signup'>Sign Up</Link></span>
          <span><Link to='/login'>Log In</Link></span>
        </Fragment>
      )
    } else {
      return <span><Link to='/index'>Sign Out</Link></span>
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

export default withRouter(connect(mapStateToProps)(Nav));
