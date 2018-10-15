function stringMapFromArray(array) {
  const result = {};
  array.forEach(elem => {
    result[elem] = elem;
  });
  return result;
}

module.exports = { stringMapFromArray };
