import React, { Component } from "react";
import { connect } from "react-redux";
import FavoritesNotes from "../FavoritesNotes/FavoritesNotes";

class Favorites extends Component {
  componentDidMount() {
    this.getFavorites();
  } //loading all favorited recipes on page load

  getFavorites() {
    this.props.dispatch({
      type: "FETCH_FAVORITES"
    });
  } //calling the generator function to display favorite recipes

  goToRecipe = event => {
    console.log("fav recipe clicked", event.target.id);
    this.props.dispatch({
      type: "FETCH_RECIPE",
      payload: event.target.id
    });
  }; //send the id of selected recipe to where "FETCH_RECIPE"
  //is called to get recipe details
  render() {
    return (
      <div>
        <h2>Your favorite recipes!</h2>
        {this.props.favorites.map(favorite => (
          <li key={favorite.favorited_id} className="listFavorites">
            <a
              href="#/recipe"
              onClick={this.goToRecipe}
              id={favorite.recipe_id}
            >
              {favorite.favorited_title}
            </a>
            <FavoritesNotes notes_id={favorite.notes_id} />
            <br></br>
          </li>
        ))}
      </div>
    );
  }
} //clicking the link will take user to the page where the
//selected recipe will display more information
//all note events are being done in FavoriteNotes

const getStore = reduxState => ({
  reduxState,
  favorites: reduxState.fetchFavorites
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(Favorites);
