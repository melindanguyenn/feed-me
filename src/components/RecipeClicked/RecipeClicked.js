import React, { Component } from "react";
import { connect } from "react-redux";

class RecipeClicked extends Component {
  state = {
    isFavorited: false
  }; //allows favorite icon to toggle what gets displayed
  favorite = event => {
    if (this.state.isFavorited === false) {
      this.setState({
        isFavorited: true
      });
      var favoriteTitle = event.target.parentElement.value;
      if (favoriteTitle === undefined) {
        favoriteTitle = event.target.value;
      }
      let favorite = {
        recipeId: Number(event.target.id),
        favoriteTitle: favoriteTitle
      };
      console.log("sending favorite", favorite);
      this.props.dispatch({
        type: "FAVORITE_RECIPE",
        payload: favorite
      });
    } else if (this.state.isFavorited === true) {
      this.setState({
        isFavorited: false
      });
    }
  }; //favorite button gets clicked then sets state to true to display other
  //icon, clicking icon will send the recipe's title (event.target.value & event.target.parentElement.value)
  //and id(event.target.id) to the database
  //clicking the button again doesn/t do anything else yet besides resetting the
  //state to false - making the icon toggle again

  render() {
    return (
      <div className="recipeDetails">
        <h2>
          {this.props.summary.title}
          {this.state.isFavorited ? (
            <>
              <button
                id={this.props.id}
                value={this.props.summary.title}
                className="favoriteButton"
                onClick={this.favorite}
              >
                <svg
                  className="bi bi-heart-fill"
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                id={this.props.id}
                value={this.props.summary.title}
                className="favoriteButton"
                onClick={this.favorite}
              >
                <svg
                  className="bi bi-heart"
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  id={this.props.id}
                  value={this.props.summary.title}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                    clipRule="evenodd"
                    value={this.props.summary.title}
                  />
                </svg>
              </button>
            </>
          )}
        </h2>

        <h4>Ingredients:</h4>
        {this.props.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount.us.value} {ingredient.amount.us.unit} {ingredient.name}
          </li>
        ))}
        <h4>Instructions:</h4>
        {this.props.directions.map(steps =>
          steps.steps.map((step, index) => (
            <p key={index}>
              <b>{step.number}.</b> {step.step}
            </p>
          ))
        )}
      </div>
    );
  }
} //display recipe's name with an icon- where the user can favorite the recipe
//map through the recipe's details to display instructions and ingredients
const getStore = reduxState => ({
  reduxState,
  id: reduxState.recipeId,
  summary: reduxState.recipeSummary,
  ingredients: reduxState.recipeIngredients,
  directions: reduxState.recipeDirections
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(RecipeClicked);
