import React, { Component } from "react";

class Account extends Component {
  state = {
    userExists: true,
    email: "",
    password: ""
  };
  signUp = () => {
    this.setState({
      userExists: false
    });
  }; //sets userExists to false on click
  login = () => {
    this.setState({
      userExists: true
    });
  }; //sets userExists to true on click
  setEmail = event => {
    console.log(event.target.value);
    this.setState({
      tempEmail: event.target.value
    });
  }; //sets a temporary email
  setPassword = event => {
    console.log(event.target.value);
    this.setState({
      tempPassword: event.target.value
    });
  }; //sets a temporary password

  render() {
    return (
      <div>
        {this.state.userExists ? (
          <>
            <h1>Login</h1>
            <form onSubmit={this.logUserIn}>
              <label>
                Email:
                <input onChange={this.setEmail} />
              </label>
              <br></br>
              <label>
                Password:
                <input onChange={this.setPassword} />
              </label>
              <br></br>
              <input type="submit" value="Login" />
              <p>
                Don't have an account?
                <button className="signUpLogin" onClick={this.signUp}>
                  <u>Sign up!</u>
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={this.logUserIn}>
              <label>
                Email:
                <input onChange={this.setEmail} />
              </label>
              <br></br>
              <label>
                Password:
                <input onChange={this.setPassword} />
              </label>
              <br></br>
              <input type="submit" value="Sign Up" />
              <p>
                Already have an account?
                <button className="signUpLogin" onClick={this.login}>
                  <u>Login!</u>
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    );
  }
} //toggles what gets displayed based on the userExists boolean
// if true, show login; if false, show sign up

export default Account;
