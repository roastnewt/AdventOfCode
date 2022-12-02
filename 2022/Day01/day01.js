const {readFileSync} = require('fs');

let problemOne = () => {

  const data = readFileSync('./Day01/input.txt', 'utf-8').split(/\n/);

  let current = 0;
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] != '') {
      current += parseInt(data[i]);
    } else {
      if (current > max) {
        max = current;
      }
      current = 0;
    }
  }

  return max;

}

let problemTwo = () => {

  const data = readFileSync('./Day01/input.txt', 'utf-8').split(/\n/);

  let current = 0;
  let topThree = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] != '') {
      current += parseInt(data[i]);
    } else {
      if (topThree.length < 3) {
        topThree.push(current);
      } else {
        if (topThree.length === 3) {
          topThree.sort((a,b) => a - b);
        }
        if (topThree[0] < current) {
          topThree.shift();
          topThree.push(current);
        }
      }
      current = 0;
    }
  }

  console.log('Top Three: ', topThree);

  return topThree.reduce((acc, curr) => acc + curr, 0);

}

module.exports = {problemOne, problemTwo};