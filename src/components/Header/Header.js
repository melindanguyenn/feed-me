import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1>FeedMe</h1>
        <div className="nav">
          <a href="#/">Home</a>
          <a href="#/favorites">Favorites</a>
          <a href="#/account">Account</a>
        </div>
      </header>
    );
  }
}

export default Header;
