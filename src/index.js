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
  yield takeEvery("FETCH_FAVORITES", getFavorites);
  yield takeEvery("ADD_NOTE", addFavoriteRecipeNotes);
  yield takeEvery("EDIT_NOTE", editFavoriteRecipeNotes);
  yield takeEvery("DELETE_NOTE", deleteFavoriteRecipeNotes);
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
  let userId = 1;
  let favoriteDto = {
    userId: userId,
    ...action.payload
  };
  yield axios.post(`api/favorite`, favoriteDto);
  console.log("back from DB!");
} //not connected to DB yet, so i'm just passing action.payload to favoriteRecipes until then

function* getFavorites() {
  console.log("fetching favorites");
  const results = yield axios.get(`api/FavoriteNotes/1`);
  console.log("favorites are", results.data);
  yield put({ type: "LIST_FAVORITES", payload: results.data });
}

function* addFavoriteRecipeNotes(action) {
  console.log("adding note");
  let notesDto = {
    favorited_id: action.data,
    notes: action.payload,
    user_id: 1
  };
  console.log(notesDto);
  
  yield axios.post(`api/notes`, notesDto);
  console.log("added note");
} //hardcode favorite_id as the next one (+1), if none set to 1

function* editFavoriteRecipeNotes(action) {
  console.log("editing note", action.payload);
  let notesDto = {
    id: 31,
    notes: action.payload
  };
  yield axios.put(`api/Notes/`, notesDto);
  console.log("note updated");
} //action.data should be serial id of note in db
//action.payload is the new note

function* deleteFavoriteRecipeNotes(action) {
  console.log("deleting note");
  yield axios.delete(`api/Notes/53`);
  console.log("note deleted");
} //hardcode the note's id to delete, if none set to 1

const recipeNotes = (state = "", action) => {
  switch (action.type) {
    case "RECIPE_NOTES":
      return action.payload;
    default:
      return state;
  }
};

const fetchFavorites = (state = [], action) => {
  switch (action.type) {
    case "LIST_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

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
const recipeReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_RECIPE":
      return action.payload;
    default:
      return state;
  }
}; //takes payload from searchRecipes and stores it in state

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
  combineReducers({
    recipeReducer,
    recipeId,
    recipeSummary,
    recipeIngredients,
    recipeDirections,
    fetchFavorites,
    recipeNotes
  }),

  applyMiddleware(sagaMiddleware)
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
