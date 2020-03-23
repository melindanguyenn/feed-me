import React, { Component } from "react";

class Favorites extends Component {
  state = {
    addingNotes: true
  };
  addNotes = () => {
    console.log("add notes");
    this.setState({
      addingNotes: false
    });
  };
  editNotes = () => {
    console.log("editing notes");
    this.setState({
      addingNotes: true
    });
  };
  render() {
    return (
      <div>
        <h1>Your favorite recipes!</h1>
        <p>this is a recipe</p>
        {this.state.addingNotes ? (<>
          <button onClick={this.addNotes}>+ Add Notes</button></>
        ) : (<>
          <button onClick={this.editNotes}>Edit Notes</button>
        
        <br></br>
        <textarea onChange={this.writingNotes} />
            <button onClick={this.saveNotes}>Save</button></>
        )}
      </div>
    );
  }
}

export default Favorites;
