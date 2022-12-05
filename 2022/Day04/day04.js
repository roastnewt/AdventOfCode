const {readFileSync} = require('fs');

let problemOne = () => {

  const data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '') continue;
    let pairs = data[i].split(',');
    let firstPair = pairs[0].split('-');
    let secondPair = pairs[1].split('-');

    if ((parseInt(firstPair[0]) >= parseInt(secondPair[0]) && parseInt(firstPair[1]) <= parseInt(secondPair[1]))
        || (parseInt(secondPair[0]) >= parseInt(firstPair[0]) && parseInt(secondPair[1]) <= parseInt(firstPair[1]))) {
          count++;
        }
  }

  return count;
  // not 522
}

let problemTwo = () => {

  const data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);

  return null;

}

module.exports = {problemOne, problemTwo};