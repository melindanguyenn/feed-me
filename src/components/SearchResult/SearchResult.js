import React, { Component } from "react";
import { connect } from "react-redux";

class SearchResult extends Component {
  goToRecipe = event => {
    console.log("recipe clicked", event.target.id);
    this.props.dispatch({
      type: "FETCH_RECIPE",
      payload: event.target.id
    });
  }; //send the id of selected recipe to where "FETCH_RECIPE"
  //is called to get recipe details
  render() {
    return (
      <div className="recipeList">
        <ul>
          {this.props.reduxState.searchResults.map((recipe, index) => (
            <li key={index} id={index}>
              <a href="#/recipe" onClick={this.goToRecipe} id={recipe.id}>
                <h4 id={recipe.id}>{recipe.title}</h4>

                <img src={recipe.image} alt="recipe dish" id={recipe.id} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
} //mapping through search results, displaying them as a list
//each listed item is a link that will send the user to a page
//containing more about the selected recipe

const getStore = reduxState => ({
  reduxState
}); //accessing store in index.js to get back search results

export default connect(getStore)(SearchResult);
