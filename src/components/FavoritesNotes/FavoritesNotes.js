import React, { Component } from "react";
import { connect } from "react-redux";

class FavoritesNotes extends Component {
  state = {
    addingNotes: false,
    hasNotes: true,
    editingNotes: false,
    notes: ""
  };
  addNotes = () => {
    console.log("add notes");
    this.setState({
      addingNotes: true
    });
  }; //user clicked add button to add a note, addingNotes will be true to display textarea
  editNotes = () => {
    console.log("edit notes");
    if (this.state.notes !== "") {
      this.setState({
        addingNotes: true,
        hasNotes: true,
        editingNotes: true
      });
    } else if (this.state.notes === "") {
      this.setState({
        addingNotes: false
      });
    }
  }; // if notes are still an empty string, addingNotes will be false
  // if notes is not an empty string, set has notes to true and editing notes to true
  //editing notes will be set to true each time the edit button gets clicked to make it editable
  saveNotes = event => {
    console.log("saving notes", event.target.id, this.state.notes);
    if (this.state.notes === "") {
      console.log("opt1");
      alert(
        "Cannot leave notes empty. Try clicking cancel and then deleting your note, if it exists!"
      );
    } else {
      console.log("opt2");
      this.setState({
        hasNotes: false
      });
      this.props.dispatch({
        type: "ADD_NOTE",
        payload: this.state.notes,
        data: Number(event.target.parentElement.id)
      });
    }
  }; // if notes is empty, alert to cancel and delete note
  // otherwise, send note to DB to be created
  editingNotes = event => {
    console.log("editing notes", event.target.id, this.state.notes);
    if (this.state.notes === "") {
      console.log("opt1");
      alert(
        "Cannot leave notes empty. Try clicking cancel and then deleting your note!"
      );
    } else {
      console.log("opt2");
      this.setState({
        editNotes: true,
        hasNotes: false
      });
      this.props.dispatch({
        type: "EDIT_NOTE",
        payload: this.state.notes,
        data: event.target.notes_id
      });
    }
  }; //if note field is left empty, alert to delete instead
  //otherwise, send updated notes to DB
  cancelNotes = () => {
    if (this.state.notes === "") {
      this.setState({
        addingNotes: false,
        hasNotes: true
      });
    } else {
      this.setState({
        addingNotes: true,
        hasNotes: false
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
    console.log("deleting", event.target.id);

    this.setState({
      addingNotes: false,
      hasNotes: true,
      editingNotes: false,
      notes: ""
    });
    this.props.dispatch({ type: "DELETE_NOTE", payload: event.target.id });
  }; //when delete is clicked, state will be reset to its original position
  render() {
    return (
      <div id={this.props.favorited_id}>
        {this.state.addingNotes ? (
          <>
            <br></br>
            {this.state.hasNotes ? (
              <>
                {this.state.editingNotes ? (
                  <>
                    <textarea
                      id={this.props.notes_id}
                      onChange={this.writingNotes}
                      value={this.state.notes}
                    />
                    <br></br>
                    <button
                      onClick={this.editingNotes}
                      id={this.props.notes_id}
                    >
                      Save
                    </button>
                    <button onClick={this.cancelNotes} id={this.props.notes_id}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <textarea
                      id={this.props.notes_id}
                      onChange={this.writingNotes}
                      value={this.state.notes}
                    />
                    <br></br>
                    <button onClick={this.saveNotes} id={this.props.notes_id}>
                      Save
                    </button>
                    <button onClick={this.cancelNotes} id={this.props.notes_id}>
                      Cancel
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <h4>Notes:</h4>
                <p>{this.state.notes}</p>
                <button onClick={this.editNotes} id={this.props.notes_id}>
                  Edit
                </button>
                <button
                  onClick={this.deleteNotes}
                  id={this.props.notes_id}
                >
                  Delete
                </button>
                <br></br>
              </>
            )}
          </>
        ) : (
          <>
            <button onClick={this.addNotes} id={this.props.notes_id}>
              + Add Notes
            </button>
          </>
        )}
      </div>
    );
  }
} //if this recipe does not have notes(false), display add notes
//button.otherwise, if it has notes(true), display as <p> until
//edit button is clicked, clicking save after editing will display updated notes

const getStore = reduxState => ({
  reduxState,
  id: reduxState.favoriteRecipes,
  summary: reduxState.recipeSummary
}); //accessing store in index.js to get back search results

export default connect(getStore)(FavoritesNotes);
