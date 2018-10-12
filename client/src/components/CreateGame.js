import React, { Component } from "react";

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      gameName: "",
      isProtected: false,
      gamePassword: ""
    };
  }

  handleFormChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { gameName, isProtected, gamePassword, username } = this.state;
    const options = { gameName, isProtected, gamePassword, username };

    this.props.api.createGame(options);
  };

  render() {
    return (
      <form
        className="createGame"
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        <h2>Create a game:</h2>
        <p>
          <label>
            Password:
            <input type="checkbox" name="isProtected" />
            <input
              type="text"
              name="gamePassword"
              disabled={!this.state.isProtected}
            />
          </label>
        </p>
        <p>
          <label>
            Player name:
            <input type="text" name="username" />
          </label>
        </p>
        <p>
          <label>
            Game name:
            <input type="text" name="gameName" />
          </label>
        </p>
        <p>
          <input type="submit" value="Start" />
        </p>
      </form>
    );
  }
}

export default CreateGame;
