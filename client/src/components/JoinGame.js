import React, { Component } from "react";

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      selectedGame: null,
      username: "",
      gamePassword: ""
    };
  }

  async componentDidMount() {
    this.setState({ games: await this.props.api.getGames() });
  }

  handleFormChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  join = event => {
    event.preventDefault();

    const { gamePassword, username, selectedGame } = this.state;
    const joinOptions = { gameId: selectedGame, gamePassword, username };

    this.props.api.joinGame(joinOptions);
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
        <ul>
          {this.state.games.map(game => (
            <li
              onClick={() => this.setState({ selectedGame: game.id })}
              key={game.id}
            >
              {game.name}
              {game.id === this.state.selectedGame && (
                <>
                  {game.isProtected && (
                    <label>
                      Password:
                      <input
                        type="text"
                        name="gamePassword"
                        visible={game.isProtected}
                      />
                    </label>
                  )}
                  <button onClick={this.join}>Join</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default JoinGame;
