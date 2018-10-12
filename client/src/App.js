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
          <>
            <Chat api={this.props.api} />
            <PlayArea api={this.props.api} />
          </>
        ) : (
          <>
            <CreateGame api={this.props.api} />
            <JoinGame api={this.props.api} />
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game.properties
  };
}

export default connect(mapStateToProps)(App);
