import React, { Component } from "react";
import { connect } from "react-redux";

class RecipeClicked extends Component {
  favorite = event => {
    console.log("favoriting", event.target.id);
    this.props.dispatch({
      type: "FAVORITE_RECIPE",
      payload: event.target.id
    })
  }; //sending the id of displayed recipe to be stored in database when favorite is clicked

  render() {
    return (
      <div>
        <h1>welcome RecipeClicked</h1>
        <button onClick={this.favorite} id={this.props.id}>Favorite</button>
        <h4>Ingredients:</h4>
        {this.props.ingredients.map((ingredient, index) =>
          <li key={index}>{ingredient.name}</li>
        )}
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
