import React, { Component } from "react";
import { connect } from "react-redux";

import MessageList from "./MessageList";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
  }

  sendMessage = () => {
    const content = this.contentRef.current.value;
    if (!content.trim()) return;

    this.contentRef.current.value = "";

    const message = { content, username: this.props.username };
    this.props.api.sendMessage(message);
  };

  render() {
    return (
      <div className="chat">
        <MessageList messages={this.props.messages} />
        <textarea ref={this.contentRef} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    messages: state.chat.messages,
    username: state.game.username
  };
};

export default connect(mapStateToProps)(Chat);
