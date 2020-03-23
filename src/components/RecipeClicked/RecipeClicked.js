import React, { Component } from "react";
import { connect } from "react-redux";

class RecipeClicked extends Component {
  favorite = () => {
    console.log("favoriting");
  };

  render() {
    return (
      <div>
        <h1>welcome RecipeClicked</h1>
        <button onClick={this.favorite}>Favorite</button>
        <h4>Ingredients:</h4>
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
  summary: reduxState.recipeSummary,
  ingredients: reduxState.recipeIngredients,
  directions: reduxState.recipeDirections
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(RecipeClicked);
