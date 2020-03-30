import React, { Component } from "react";
import { connect } from "react-redux";
import  Auth  from "../Auth/Auth"

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
  logUserIn = event => {
    console.log("logging in", this.state);
    this.props.dispatch({
      type: "LOGIN",
      payload: this.state
    });
  };
  createUser = event => {
    event.preventDefault();
    console.log("creating user",this.state);
    this.props.dispatch({
      type: "SIGNUP",
      payload: this.state
    })
  };
  setEmail = event => {
    this.setState({
      email: event.target.value
    });
  }; //sets a temporary email
  setPassword = event => {
    this.setState({
      password: event.target.value
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
            <form onSubmit={this.logUserIn }>
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
            </form>
            <p>
              Don't have an account?
              <button className="signUpLogin" onClick={this.signUp}>
                <u>Sign up!</u>
              </button>
            </p>
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={this.createUser}>
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
            </form>
            <p>
              Already have an account?
              <button className="signUpLogin" onClick={this.login}>
                <u>Login!</u>
              </button>
            </p>
          </>
        )}
      </div>
    );
  }
} //toggles what gets displayed based on the userExists boolean
// if true, show login; if false, show sign up
//clicking email on the login option will autopopulate the text fields
const getStore = reduxState => ({
  reduxState,
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(Account);
