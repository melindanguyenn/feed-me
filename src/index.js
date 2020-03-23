import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";

function* rootSaga() {
  yield takeEvery("GET_RECIPES", searchRecipes);
  yield takeEvery("FETCH_RECIPE", getRecipe);
  yield takeEvery("FAVORITE_RECIPE", favoriteRecipe);
} //button activates an action from a component, then runs the corresponding function
function* searchRecipes(action) {
  console.log("in getRecipe", action.payload);
  const results = yield axios.get(`/api/recipe/search/${action.payload}`);
  console.log("in getRecipe, results", results.data);
  yield put({ type: "GET_RECIPE", payload: results.data });
} //funtion takes action.payload from app.js, sends it to server to fetch data
//waits for data to return, then sends to where "GET_RECIPE" gets called (recipeReducer)
function* getRecipe(action) {
  console.log("fetching recipe with id of", action.payload);
  const results = yield axios.get(`/api/recipe/${action.payload}`);
  console.log("recipedetails", results.data.ingredients.ingredients);
  yield put({ type: "RECIPE_ID", payload: action.payload });
  yield put({ type: "RECIPE_SUMMARY", payload: results.data.summary });
  yield put({
    type: "RECIPE_INGREDIENTS",
    payload: results.data.ingredients.ingredients
  });
  yield put({ type: "RECIPE_DIRECTIONS", payload: results.data.directions });
} // getting recipe details from server and sending it to recipeDetails
function* favoriteRecipe(action) {
  console.log("sending recipe to DB", action.payload);
  // const results = yield axios.post(`api/favorites`, action.payload);
  // console.log("back from DB!", results);
  yield put({ type: "DISPLAY_FAVORITES", payload: action.payload });
} //not connected to DB yet, so i'm just passing action.payload to favoriteRecipes until then

const favoriteRecipes = (state = [], action) => {
  switch (action.type) {
    case "DISPLAY_FAVORITES":
      return [...state, action.payload];
    default:
      return state;
  }
}; //stores all favorited recipes until ready to display
const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_RECIPE":
      return action.payload;
    default:
      return state;
  }
}; //takes payload from searchRecipes and stores it in state
const recipeSummary = (state = [], action) => {
  switch (action.type) {
    case "RECIPE_SUMMARY":
      return action.payload;
    default:
      return state;
  }
}; //stores summary from getRecipe until called upon
const recipeIngredients = (state = [], action) => {
  switch (action.type) {
    case "RECIPE_INGREDIENTS":
      return action.payload;
    default:
      return state;
  }
}; //stores ingredients from getRecipe until called upon
const recipeDirections = (state = [], action) => {
  switch (action.type) {
    case "RECIPE_DIRECTIONS":
      return action.payload;
    default:
      return state;
  }
}; //stores directions from getRecipe until called upon
const recipeId = (state = [], action) => {
  switch (action.type) {
    case "RECIPE_ID":
      return action.payload;
    default:
      return state;
  }
}; //stores directions from getRecipe until called upon

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
  combineReducers({
    recipeReducer,
    recipeId,
    recipeSummary,
    recipeIngredients,
    recipeDirections,
    favoriteRecipes
  }),

  applyMiddleware(sagaMiddleware, logger)
); //accesses store from recipeReducer and allows other components to use it

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
