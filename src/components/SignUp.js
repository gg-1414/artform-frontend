import React, { Component } from 'react';
import '../stylesheets/SignUp.css'
// import { setCurrentUserType } from '../redux/actioncreator'

class SignUp extends Component {
  state = {
    user: null, // Artist or Bidder
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    imgUrl: ''
  }

  draw = () => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#ebebeb";
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

        if(y > 510){ // When y hits greater than 300
          vy *= -0.95; // gravity
          y = 510; // This sets the "floor", the max value the y can be.
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
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    switch(this.state.user) {
      case 'Artist':
        const artistData = {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
          name: this.state.name,
          img_url: this.state.imgUrl
        }

        fetch('https://artform-backend.herokuapp.com/api/v1/artists', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        break
      case 'Bidder':
        const bidderData = {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
          name: this.state.name
        }

        fetch('https://artform-backend.herokuapp.com/api/v1/bidders', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bidderData)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        break
    }
  }

  render() {
    console.log('signup state', this.state);
    return (
      <div id="signup">
        <canvas></canvas>
        <div id="signup-form">
          <h2>SIGN UP AS</h2>
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
            <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange}/>
            <input type="text" name="name" placeholder="Name" onChange={this.handleChange}/>
            {this.state.user === 'Artist' ? <input type="text" name="imgUrl" placeholder="Image URL" onChange={this.handleChange}/> : null}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    )

  }
}

export default SignUp;
