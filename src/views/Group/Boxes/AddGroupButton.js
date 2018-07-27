import React, { Component } from "react";
import "../styles/Group.css";

class AddGroupBox extends Component {
  directToCreateGroup = () => {
    this.props.history.push("/createGroup");
  };

  render = () => {
    return (
      <div
        className="add-group-box col l4 s8 offset-l4 offset-s2"
        onClick={this.directToCreateGroup}
      >
        <h3 className="add-group-box-text">Create Group</h3>
      </div>
    );
  };
}

export default AddGroupBox;