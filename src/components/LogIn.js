import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/LogIn.css'
import { handleArtistLogin, handleBidderLogin } from '../redux/actioncreator'

class LogIn extends Component {
  state = {
    currentUser: null,
    email: '',
    password: ''
  }

  artistOrBidder = (e) => {
    this.setState({ currentUser: e.target.innerText })
    e.target.style.color = 'red'
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.state.currentUser === 'Artist' ?
    this.props.handleArtistLogin(this.state.email, this.state.password) : this.props.handleBidderLogin(this.state.email, this.state.password)
    this.state.currentUser === 'Artist' ?
    this.props.history.push('/index') : this.props.history.push('/login')
  }

  render() {
    console.log('state: ', this.state)
    return (
      <div id="login">
        <h1 onClick={this.artistOrBidder}>Artist</h1>
        <h1 onClick={this.artistOrBidder}>Bidder</h1>
        <form onSubmit={this.submitHandler}>
          <input type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, { handleArtistLogin, handleBidderLogin })(LogIn));
