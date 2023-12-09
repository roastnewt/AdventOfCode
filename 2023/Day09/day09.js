const {readFileSync} = require('fs');

function getDiff(arr) {
  let diff = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diff.push(arr[i+1] - arr[i]);
  }
  return diff;
}

let problemOne = () => {
  let data = readFileSync('./Day09/input.txt', 'utf-8').split(/\n/);
  data = data.map((x) => x.split(' ').map((y) => parseInt(y)));
  let total = 0;
  for (let row of data) {
    let diffs = [row];
    for(let i = 0; i < row.length; i++) {
      if (diffs[i].every((x) => x === 0)) {
        break;
      }
      diffs.push(getDiff(diffs[i]));
    }
    let value = 0;
    for (let i = diffs.length - 1; i >= 0; i--) {
      value += diffs[i][diffs[i].length - 1];
    }
    total += value;
  }
  return total;
}

let problemTwo = () => {
  let data = readFileSync('./Day09/input.txt', 'utf-8').split(/\n/);
  data = data.map((x) => x.split(' ').map((y) => parseInt(y)));
  let total = 0;
  for (let row of data) {
    let diffs = [row];
    for(let i = 0; i < row.length; i++) {
      if (diffs[i].every((x) => x === 0)) {
        break;
      }
      diffs.push(getDiff(diffs[i]));
    }
    let value = 0;
    for (let i = diffs.length - 1; i >= 0; i--) {
      value = diffs[i][0] - value;
    }
    total += value;
  }
  return total;
}

module.exports = {problemOne, problemTwo};