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
    if (this.state.temp === "") {
      alert("Please enter an ingredient!")
    } else {
      this.setState({
        ingredients: [...this.state.ingredients, this.state.temp]
      });
      this.clearInput();
    }
  }; //assigning uesr's temp input to ingredients array,
  //then clearing the input field

  runSearch = () => {
    console.log("searching for recipes with", this.state.ingredients);
    if (this.state.ingredients.length === 0) {
      alert("Please add an ingredient!")
    } else {
      this.props.dispatch({
        type: "GET_RECIPES",
        payload: this.state.ingredients
      });
    }
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
          <li key={index} id={index} className="itemList">
            {ingredient}
            <button className="listItems" onClick={this.delete}>
              <svg
                class="bi bi-x-circle"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
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
