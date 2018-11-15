import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import '../stylesheets/Nav.css';
import { removeCurrentUser, getMessages } from '../redux/actioncreator'

class Nav extends Component {
  handleLogOut = (e) => {
    this.props.removeCurrentUser()
  }

  profileClickHandler = () => {
    this.props.getMessages(this.props.currentUser.id)
  }

  loggedIn = () => {
    if(localStorage.token === 'undefined' || localStorage.token === undefined) {
      return (
        <Fragment>
          <span className="nav-link"><Link to='/signup'>Sign Up</Link></span>
          <span className="nav-link"><Link to='/login'>Log In</Link></span>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <span className="nav-link"><Link to='/index' onClick={this.handleLogOut}>Log Out</Link></span>
          <Link to='/bidder/profile' onClick={this.profileClickHandler}><img src="/images/profile-icon.png" alt="profile" id="profile" /></Link>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <header>
        <nav>
          <h1><Link to='/index'>Artform</Link></h1>
          {this.loggedIn()}
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    latestAuctionedArt: state.latestAuctionedArt
  }
}

export default withRouter(connect(mapStateToProps, {removeCurrentUser, getMessages})(Nav));
