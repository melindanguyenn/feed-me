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

  autofill = () => {
    this.setState({
      email: "melinda@gmail.com",
      password: "1234"
    });
  }; //an invisible button to auto populate the inputs with text
  render() {
    return (
      <div>
        {this.state.userExists ? (
          <>
            <h1>Login</h1>
            <form onSubmit={this.logUserIn}>
              <label>
                <button className="autofill" onClick={this.autofill}>
                  Email:
                </button>
                <input onChange={this.setEmail} value={this.state.email} />
              </label>
              <br></br>
              <label>
                Password:
                <input
                  onChange={this.setPassword}
                  value={this.state.password}
                />
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
//clicking email on the login option will autopopulate the text fields

export default Account;
