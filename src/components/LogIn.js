import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../stylesheets/LogIn.css'
import { setCurrentUserType, handleArtistLogin, handleBidderLogin } from '../redux/actioncreator'

class LogIn extends Component {
  state = {
    user: null, // Artist or Bidder
    email: '',
    password: '',
    error: false
  }

  draw = () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let x = 0,
          y = 80,
          vx = 7,
          vy = -10,
          gravity = 1;

      setInterval(function(){
        ctx.fillStyle = "#ebebeb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        x += vx;
        y += vy;
        vy += gravity;

        if(y > 490){ // When y hits greater than 300
          vy *= -0.95; // gravity
          y = 490; // This sets the "floor", the max value the y can be.
        }

        ctx.fillStyle = "red"; // Changed color of ball to yellow
        ctx.fillRect(x, y, 15, 15);
      }, 25);
  }

  componentDidMount() {
    this.draw()
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

  componentDidCatch(error, info) {
    this.setState({ error: true })
    console.log('error:', error);
    console.log('info:', info);
  }

  render() {
    console.log('currentUserType: ', this.props.currentUserType);
    return (
      <div id="login">
        <canvas></canvas>
        <div id="login-form">
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
            <button type="submit">Login</button>
          </form>
        </div>
        {this.state.error ? <p>Something is wrong</p> : null}
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
