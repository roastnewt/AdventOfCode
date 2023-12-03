const {readFileSync} = require('fs');

const symMatch = /[^\d.]/;
const numMatch = /\d/;
function checkSurrounding(data, i, j, test) {
  //check top left
  if (i > 0 && j > 0) {
    if (test(data[i-1][j-1])) {
      return true;
    }
  }
  //check top
  if (i > 0) {
    if (test(data[i-1][j])) {
      return true;
    }
  }
  //check top right
  if (i > 0 && j < data[i].length - 1) {
    if (test(data[i-1][j+1])) {
      return true;
    }
  }
  //check left
  if (j > 0) {
    if (test(data[i][j-1])) {
      return true;
    }
  }
  //check right
  if (j < data[i].length - 1) {
    if (test(data[i][j+1])) {
      return true;
    }
  }
  //check bottom left
  if (i < data.length - 1 && j > 0) {
    if (test(data[i+1][j-1])) {
      return true;
    }
  }
  //check bottom
  if (i < data.length - 1) {
    if (test(data[i+1][j])) {
      return true;
    }
  }
  //check bottom right
  if (i < data.length - 1 && j < data[i].length - 1) {
    if (test(data[i+1][j+1])) {
      return true;
    }
  }

  return false;
}

function symbolTest(datum) {
    return symMatch.test(datum);
}

let problemOne = () => {

  let data = readFileSync('./Day03/input.txt', 'utf-8').split(/\n/);
  data = data.map(datum => datum.split(''))
  
  let sum = 0;
  for(let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (!isNaN(parseInt(data[i][j]))) {
        let num = data[i][j];
        data[i][j] = '.';
        let foundStar = checkSurrounding(data, i, j, symbolTest);
        for(let k = 1; !isNaN(parseInt(data[i][j+k])); k++) {
          num += data[i][j+k];
          data[i][j+k] = '.';
          foundStar ||= checkSurrounding(data, i, j+k, symbolTest);
        }
        if (foundStar) {
          sum += parseInt(num);
        }
      }
    }
  }
  //535078
  return sum;
}


function getFullNum(data, i, j, checked) {
  let num = data[i][j];
  let start = j;
  let end = j;
  checked[`${i},${j}`] = true;
  //check left
  for(let k = j - 1; numMatch.test(data[i][k]) && k >= 0; k--) {
    num = data[i][k] + num;
    start = k
    checked[`${i},${k}`] = true;
  }
  //check right
  for(let k = j + 1; numMatch.test(data[i][k]) && k < data[i].length; k++) {
    num += data[i][k];
    end = k;
    checked[`${i},${k}`] = true;
  }
  let val = parseInt(num);
  return {val, checked};
}

function getSurroundingNums(data, i, j) {
  //check top left
  let nums = [];
  let checked = {};
  if (i > 0 && j > 0) {
    if (numMatch.test(data[i-1][j-1])) {
      let result = getFullNum(data, i-1, j-1, checked)
      checked = result.checked;
      nums = [...nums, result.val] 
    }
  }
  //check top
  if (i > 0) {
    if (!checked[`${i-1},${j}`] && numMatch.test(data[i-1][j])) {
      let result = getFullNum(data, i-1, j, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check top right
  if (i > 0 && j < data[i].length - 1) {
    if (!checked[`${i-1},${j+1}`] && numMatch.test(data[i-1][j+1])) {
      let result = getFullNum(data, i-1, j+1, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check left
  if (j > 0) {
    if (!checked[`${i},${j-1}`] && numMatch.test(data[i][j-1])) {
      let result = getFullNum(data, i, j-1, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check right
  if (j < data[i].length - 1) {
    if(!checked[`${i},${j+1}`] && numMatch.test(data[i][j+1])) {
      let result = getFullNum(data, i, j+1, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check bottom left
  if (i < data.length - 1 && j > 0) {
    if(!checked[`${i+1},${j-1}`] && numMatch.test(data[i+1][j-1])) {
      let result = getFullNum(data, i+1, j-1, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check bottom
  if (i < data.length - 1) {
    if (!checked[`${i+1},${j}`] && numMatch.test(data[i+1][j])) {
      let result = getFullNum(data, i+1, j, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  //check bottom right
  if (i < data.length - 1 && j < data[i].length - 1) {
    if (!checked[`${i+1},${j+1}`] && numMatch.test(data[i+1][j+1])) {
      let result = getFullNum(data, i+1, j+1, checked)
      checked = result.checked;
      nums = [...nums, result.val]
    }
  }
  return nums;
}


let problemTwo = () => {

  let data = readFileSync('./Day03/input.txt', 'utf-8').split(/\n/);

  data = data.map(datum => datum.split(''))

  let sum = 0;
  for(let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === '*') {
        let nums = getSurroundingNums(data, i, j);
        if (nums.length === 2) {
          sum += nums[0] * nums[1];
        }
      }
    }
  }
  // not 762125915071
  // 75312571
  return sum
}

module.exports = {problemOne, problemTwo};