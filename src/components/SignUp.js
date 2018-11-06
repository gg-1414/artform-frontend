import React, { Component } from 'react';
import '../stylesheets/SignUp.css'

class SignUp extends Component {
  state = {
    currentUser: null
  }

  submitHandler = (e) => {
    e.preventDefault()
    const data = {

    }
    fetch('')
  }

  render() {
    return (
      <div id="signup" className="slideIn">
        <div id="signup-img">

        </div>
        <div id="signup-form">
          <form onSubmit={this.submitHandler}>
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="password" name="password_confirmation" placeholder="Password Confirmation"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    )

  }
}

export default SignUp;
