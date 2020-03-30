import React, { Component } from "react";
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import RecipeClicked from "../RecipeClicked/RecipeClicked";
import Favorites from "../Favorites/Favorites";
import Account from "../Account/Account";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {/* <Redirect exact from="/account" to="/account" /> */}

            <Route exact path="/account" component={Account} />
            <ProtectedRoute exact path="/favorites" component={Favorites} />
            <ProtectedRoute exact path="/recipe" component={RecipeClicked} />
            <ProtectedRoute exact path="/" component={Home} />
            <Route render={() =><h1>404 - Page not found!</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
