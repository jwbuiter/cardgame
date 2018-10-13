import React from "react";

const ReadyScreen = props => {
  return (
    <ul>
      {Object.values(props.players).map(player => (
        <li key={player.id}>
          {player.username}
          <input
            type="checkbox"
            checked={player.ready}
            onChange={props.ready}
            disabled={player.id !== props.user.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ReadyScreen;
