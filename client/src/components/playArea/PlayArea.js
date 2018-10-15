import React, { Component } from "react";
import { connect } from "react-redux";

import ReadyScreen from "./ReadyScreen";

class PlayArea extends Component {
  render() {
    return this.props.started ? (
      <div className="test" />
    ) : (
      <ReadyScreen api={this.props.api} />
    );
  }
}

function mapStateToProps(state) {
  return {
    started: state.game.started
  };
}

export default connect(mapStateToProps)(PlayArea);

