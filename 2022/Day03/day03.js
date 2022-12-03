const {readFileSync} = require('fs');

let recordItem = (array, char) =>  {
  (!array[char]) ? array[char] = 1 : array[char]++;
}

let getPriority = (char) => {
  let code = char.charCodeAt(0);
  if (code > 96 && code < 123) {
    // lowercase letters a-z have 97-122 charcodes
    // translate to range 1-26
    return code - 96;
  }
  if (code > 64 && code < 91) {
    // uppercase letters A-Z have 65-90 charcodes
    // translate to range 27-52
    return code - 64 + 26;
  }
  throw 'Bad data: character is not a-z or A-Z';
}

let problemOne = () => {

  const data = readFileSync('./Day03/input.txt', 'utf-8').split(/\n/);

  let priorities = 0;

  for (let i = 0; i < data.length; ++i) {

    if (data[i].length === 0) continue;

    if (data[i].length % 2 != 0) {
      throw `Bad data: odd number of items on line ${i}`;
    }

    let firstPocket = data[i].slice(0, (data[i].length / 2));
    let secondPocket = data[i].slice(data[i].length / 2);

    let seenItems = {};
    for (let j = 0; j < firstPocket.length; j++) {
      recordItem(seenItems, firstPocket[j]);
    }

    let duplicatedItems = {};
    for (let j = 0; j < secondPocket.length; j++) {
      if (!seenItems[secondPocket[j]]) continue;

      seenItems[secondPocket[j]]--;
      recordItem(duplicatedItems, secondPocket[j]);

    }

    for (character in duplicatedItems) {
      if (duplicatedItems[character] > 0) {
        priorities += getPriority(character); //* duplicatedItems[character];  <-- this is some BS
      }
    }

  }

  return priorities;

}

let problemTwo = () => {

  const data = readFileSync('./Day03/input.txt', 'utf-8').split(/\n/);

  let priorities = 0;

  for (let i = 0; i < data.length; i += 3) {

    if (data[i].length === 0) continue;
    let seenItems = {};
    for (let j = 0; j < data[i].length; j++) {
      seenItems[data[i][j]] = 1;
    }
    for (let j = 0; j < data[i+1].length; j++) {
      if (seenItems[data[i+1][j]] === 1) {
        seenItems[data[i+1][j]] = 2;
      }
    }
    for (let j = 0; j < data[i+2].length; j++) {
      if (seenItems[data[i+2][j]] === 2) {
        seenItems[data[i+2][j]] = 3;
      }
    }

    for (item in seenItems) {
      if (seenItems[item] === 3) {
        priorities += getPriority(item);
      }
    }

  }

  return priorities;

}

module.exports = {problemOne, problemTwo};