import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/LogIn.css'
import { setCurrentUserType, handleArtistLogin, handleBidderLogin } from '../redux/actioncreator'

class LogIn extends Component {
  state = {
    user: null, // Artist or Bidder
    email: '',
    password: ''
  }

  artistOrBidder = (e) => {
    this.setState({ user: e.target.innerText })
    this.props.setCurrentUserType(e.target.innerText)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    switch(this.props.currentUserType) {
      case 'Artist':
        this.props.handleArtistLogin(this.state.email, this.state.password)
        this.props.history.push('/artist/profile')
        break
      case 'Bidder':
        this.props.handleBidderLogin(this.state.email, this.state.password)
        this.props.history.push('/index')
        break
      default:
        this.props.history.push('/index')
    }
  }

  render() {
    console.log('state: ', this.state)
    console.log('currentUserType: ', this.props.currentUserType);
    return (
      <div id="login">
        <h2>LOGIN AS</h2>
        <h1
          onClick={this.artistOrBidder}
          className={this.state.user === 'Bidder' ? 'highlight' : null}
        >Bidder</h1>
      <span className="font70">     |     </span>
        <h1
          onClick={this.artistOrBidder}
          className={this.state.user === 'Artist' ? 'highlight' : null}
        >Artist</h1>
        <form onSubmit={this.submitHandler}>
          <input type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUserType: state.currentUserType
  }
}

export default withRouter(connect(mapStateToProps, { setCurrentUserType, handleArtistLogin, handleBidderLogin })(LogIn));
