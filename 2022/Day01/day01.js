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
  let topThree = [0, 0, 0];
  for (let i = 0; i < data.length; i++) {
    if (data[i] != '') {
      current += parseInt(data[i]);
    } else {
      if (topThree[2] < current) {
          topThree.push(current);
          topThree.sort((a,b) => b - a);
          topThree[3] = 0;
      }
      current = 0;
    }
  }

  return topThree.reduce((acc, curr) => acc + curr, 0);

}

module.exports = {problemOne, problemTwo};