import React from "react";

const MessageList = props => {
  console.log(props);
  return (
    <ul className="messageList">
      {props.messages.map(message => (
        <li key={message.id}>
          <b>{message.sender.username}:</b>
          {message.content}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
