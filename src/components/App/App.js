import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import RecipeClicked from "../RecipeClicked/RecipeClicked";
import Favorites from "../Favorites/Favorites";
import Account from "../Account/Account";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe" component={RecipeClicked} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/account" component={Account} />
          <Route render={() => <h1>404 - Page not found!</h1>} />
        </div>
      </Router>
    );
  }
}

export default App;
