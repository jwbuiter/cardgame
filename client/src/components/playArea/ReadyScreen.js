import React, { Component } from "react";
import { connect } from "react-redux";

class ReadyScreen extends Component {
  ready = event => {
    this.props.api.ready(event.target.checked);
  };

  start = () => {
    this.props.api.startGame();
  };

  leave = () => {
    this.props.api.leaveGame();
  };

  kick = id => {
    this.props.api.kickPlayer(id);
  };

  render() {
    const ownerID = this.props.players[0].id;
    return (
      <>
        <ul>
          {this.props.players.map(player => (
            <li key={player.id}>
              <input
                type="checkbox"
                checked={player.ready}
                onChange={this.ready}
                disabled={player.id !== this.props.user.id}
              />
              {player.username}
              {this.props.user.id === ownerID &&
                player.id !== ownerID && (
                  <button onClick={() => this.kick(player.id)}>Kick</button>
                )}
            </li>
          ))}
        </ul>
        {ownerID === this.props.user.id && (
          <button onClick={this.start}>Start</button>
        )}
        <button>Leave</button>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    started: state.game.started,
    players: state.game.players,
    user: state.game.user
  };
}

export default connect(mapStateToProps)(ReadyScreen);
