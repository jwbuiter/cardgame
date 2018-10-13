import React, { Component } from "react";
import { connect } from "react-redux";

import Chat from "./components/chat/Chat";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import PlayArea from "./components/playArea/PlayArea";

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.game ? (
          <div className="mainScreen">
            <Chat api={this.props.api} />
            <PlayArea api={this.props.api} />
          </div>
        ) : (
          <div className="joinScreen">
            <CreateGame api={this.props.api} />
            <JoinGame api={this.props.api} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game.id
  };
}

export default connect(mapStateToProps)(App);
