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
}

let problemTwo = () => {

  const data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '') continue;
    let pairs = data[i].split(',');
    let firstPair = pairs[0].split('-');
    let secondPair = pairs[1].split('-');
    firstPair[0] = parseInt(firstPair[0]);
    firstPair[1] = parseInt(firstPair[1]);
    secondPair[0] = parseInt(secondPair[0]);
    secondPair[1] = parseInt(secondPair[1]);


    // what does it mean to overlap?
    // 3-5, 4-9
    // 3 between 4 and 9 or 5 between 4 and 9
    // OR 4 between 3 and 5 or 9 between 3 and 5

    if ((firstPair[0] >= secondPair[0] && firstPair[0] <= secondPair[1]) ||
        (firstPair[1] >= secondPair[0] && firstPair[1] <= secondPair[1]) ||
        (secondPair[0] >= firstPair[0] && secondPair[0] <= firstPair[1]) ||
        (secondPair[1] >= firstPair[0] && secondPair[1] <= firstPair[1])) {
          count++;
        }
  }

  return count;

}

module.exports = {problemOne, problemTwo};