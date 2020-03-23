import React, { Component } from "react";
import { connect } from "react-redux";

class Favorites extends Component {
  state = {
    hasNotes: false,
    editingNotes: true,
    notes: ""
  };
  addNotes = () => {
    console.log("add notes");
    this.setState({
      hasNotes: true
    });
  }; //user clicked add button to add a note, hasnotes will be true to display textarea
  editNotes = () => {
    console.log("edit notes");
    if (this.state.notes !== "") {
      this.setState({
        hasNotes: true,
        editingNotes: true
      });
    } else if (this.state.notes === "") {
      this.setState({
        hasNotes: false
      });
    }
  }; // if notes are still an empty string, hasNotes will be false
  // if notes is not an empty string, set has notes to true and editing notes to true
  //editing notes will be set to true each time the edit button gets clicked to make it editable
  saveNotes = event => {
    console.log("saving notes", event.target.id);
    if (this.state.notes !== this.state.notes) {
      this.setState({
        editingNotes: true
      });
      this.props.dispatch({ type: "ADD_NOTE", payload: this.state.notes, data: event.target.id })
    } else if (this.state.notes === "") {
      alert('Cannot leave notes empty. Try clicking cancel and then deleting your note, if it exists!')
    } else {
      this.setState({
        editingNotes: false
      });
    }
  }; // if notes doesn't equal notes, set editing boolean to true (user is editing)
  // if notes are the same, user is not editing, therefore, boolean is false
  cancelNotes = () => {
    if (this.state.notes === "") {
      this.setState({
        hasNotes: false,
        editingNotes: true
      });
    } else {
      this.setState({
        hasNotes: true,
        editingNotes: false
      });
    }
  }; //if notes is an empty string, has notes is still false and user edit notes will be true
  // if notes is not an empty string, hasnotes is true and user is done editing notes(false)
  writingNotes = event => {
    this.setState({
      notes: event.target.value
    });
  }; //sets text from textarea to this.state.notes
  deleteNotes = event => {
    console.log('deleting', event.target.id);
    
    this.setState({
      hasNotes: false,
      editingNotes: true,
      notes: ""
    });
    this.props.dispatch({type: "DELETE_NOTES", payload: event.target.id})
  }; //when delete is clicked, state will be reset to its original position
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
        <h1>Your favorite recipes!</h1>
        {this.props.id.map(id => (
          <li key={id}>
            <a href="#/recipe" onClick={this.goToRecipe} id={id}>{id}</a>
            {this.state.hasNotes ? (
              <>
                <br></br>
                {this.state.editingNotes ? (
                  <>
                    <textarea
                      onChange={this.writingNotes}
                      value={this.state.notes}
                      id={id}
                    />
                    <br></br>
                    <button onClick={this.saveNotes} id={id}>Save</button>
                    <button onClick={this.cancelNotes} id={id}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h4>Notes:</h4>
                    <p>{this.state.notes}</p>
                    <button onClick={this.editNotes} id={id}>Edit</button>
                    <button onClick={this.deleteNotes} id={id}>Delete</button>
                  </>
                )}
              </>
            ) : (
              <>
                <button onClick={this.addNotes} id={id}>+ Add Notes</button>
              </>
            )}
          </li>
        ))}
      </div>
    );
  }
} //if this recipe does not have notes(false), display add notes button. otherwise, if it has notes(true)
//display as <p> until edit button is clicked, clicking save after editing will display updated notes

const getStore = reduxState => ({
  reduxState,
  id: reduxState.favoriteRecipes,
  summary: reduxState.recipeSummary
}); //accessing stores in index.js to get back search results, creating shortcut for accessing store

export default connect(getStore)(Favorites);
