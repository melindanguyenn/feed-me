import React, { Component } from "react";
import { connect } from "react-redux";

class RecipeClicked extends Component {
  favorite = event => {
    console.log("favoriting", event.target.id);
    this.props.dispatch({
      type: "FAVORITE_RECIPE",
      payload: event.target.id
    });
  }; //sending the id of displayed recipe to be stored in database when favorite is clicked

  render() {
    return (
      <div>
        <h1>
          {this.props.summary.title}{" "}
          <button className="favoriteButton" onClick={this.favorite} id={this.props.id}>
            <svg
              class="bi bi-heart"
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </h1>

        <h4>Ingredients:</h4>
        {this.props.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
        {/* {this.props.ingredients.map(ingredient => ingredient.amount.us.map((amount, index) => <p key={index}>{amount.value}</p>))} */}
        <h4>Instructions:</h4>
        {this.props.directions.map(steps =>
          steps.steps.map((step, index) => (
            <p key={index}>
              {step.number}. {step.step}
            </p>
          ))
        )}
      </div>
    );
  }
}
const getStore = reduxState => ({
  reduxState,
  id: reduxState.recipeId,
  summary: reduxState.recipeSummary,
  ingredients: reduxState.recipeIngredients,
  directions: reduxState.recipeDirections
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(RecipeClicked);
