const actionTypes = [
  "JOINED_GAME",
  "USER_READY",
  "GAME_STARTED",
  "LEFT_GAME",
  "RECEIVED_MESSAGE"
];

function stringMapFromArray(array) {
  const result = {};
  array.forEach(elem => {
    result[elem] = elem;
  });
  return result;
}

module.exports = stringMapFromArray(actionTypes);
