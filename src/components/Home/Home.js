import React, { Component } from "react";
import { connect } from "react-redux";
import SearchResult from "../SearchResult/SearchResult";

class Home extends Component {
  state = {
    ingredients: [],
    temp: ""
  };

  typeIngredient = event => {
    this.setState({
      temp: event.target.value
    });
  }; //assigning user's input to a temporary property

  addIngredient = () => {
    console.log("adding", this.state.temp);
    this.setState({
      ingredients: [...this.state.ingredients, this.state.temp]
    });
    this.clearInput();
  }; //assigning uesr's temp input to ingredients array,
  //then clearing the input field

  runSearch = () => {
    console.log("searching for recipes with", this.state.ingredients);
    this.props.dispatch({
      type: "GET_RECIPES",
      payload: this.state.ingredients
    });
  }; //will send this.state.ingredients to saga, to run a search
  //results stored in a reducer which will be called to display on page

  clearInput = () => {
    this.setState({
      temp: ""
    });
  }; //clearing input field when this function is called

  delete = event => {
    console.log("deleting", event.target.parentElement);
    let index = event.target.parentElement.id;
    this.state.ingredients.splice(index, 1);
    this.setState({
      ingredients: this.state.ingredients
    });
    console.log("ingredients: ", this.state.ingredients);
  }; //deleting the selected ingredient from ingredients
  //array by targeting parent id, splicing, then resetting the state

  render() {
    return (
      <div className="ingredientList">
        <input
          onChange={this.typeIngredient}
          value={this.state.temp}
          placeholder="Add an ingredient"
        />
        <button onClick={this.addIngredient}>Add</button>
          {this.state.ingredients.map((ingredient, index) => (
            <li key={index} id={index}>
              {ingredient} <button onClick={this.delete}>x</button>
            </li>
          ))}
        <br></br>
        <button onClick={this.runSearch}>Search</button>
        <SearchResult />
      </div>
    );
  }
} //renders each item the user adds as an ingredients,
//looks for recipes, then displays SearchResults
const getStore = reduxState => ({
  reduxState
}); //accessing store in index.js to get back search results

export default connect(getStore)(Home);
