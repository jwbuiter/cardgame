import React, { Component } from "react";

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      username: "",
      gameId: "",
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

  handleFormSubmit = async event => {
    event.preventDefault();

    const { gameName, isProtected, gamePassword, username } = this.state;
    const options = { gameName, isProtected, gamePassword, username };

    const response = await this.props.api.joinGame(options);
    console.log(response);
  };

  render() {
    return (
      <form
        className="joinGame"
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
      >
        <h2>Join a game:</h2>
        <p>
          <label>
            Player name:
            <input type="text" name="username" />
          </label>
        </p>
        <p>
          <label>
            Password:
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

export default JoinGame;
