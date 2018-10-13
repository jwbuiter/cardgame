import React, { Component } from "react";
import { connect } from "react-redux";

import ReadyScreen from "./ReadyScreen";

class PlayArea extends Component {
  ready = event => {
    this.props.api.ready(event.target.checked);
  };

  render() {
    return this.props.started ? (
      <div className="test" />
    ) : (
      <ReadyScreen
        ready={this.ready}
        user={this.props.user}
        players={this.props.players}
      />
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

export default connect(mapStateToProps)(PlayArea);
