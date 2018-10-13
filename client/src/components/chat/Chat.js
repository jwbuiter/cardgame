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

    this.props.api.sendMessage(content);
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
    messages: state.chat.messages
  };
};

export default connect(mapStateToProps)(Chat);
