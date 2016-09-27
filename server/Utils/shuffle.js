const shuffle = (arr) => {
  let partition = arr.length, temp, chosen;
  // While there remain elements to shuffle…
  while (partition) {
    // Pick a remaining element…
    chosen = Math.floor(Math.random() * partition);

    // And swap it with the current element.
    temp = arr[--partition];
    arr[partition] = arr[chosen];
    arr[chosen] = temp;
  }
  return arr;
}

module.exports = shuffle;
