const {readFileSync} = require('fs');

let parseData = (data) => {

  let crates = [[],[],[],[],[],[],[],[],[]];
  for (let i = 0; data[i] != ' 1   2   3   4   5   6   7   8   9'; i++) {
    for (let j = 0; j*4 < data[i].length; j++) {
      if (data[i][j*4 + 1] != ' ') {
        crates[j].unshift(data[i][j*4 + 1]);
      }
    }
  }

  let instructions = [];
  for (let i = 10; i < data.length; i++) {
    let move = {};
    let firstSpace = data[i].indexOf(' ');
    let secondSpace = data[i].indexOf(' ', firstSpace + 1);
    let from = data[i].indexOf('from');
    let to = data[i].indexOf('to');
    move.number = parseInt(data[i].substring(firstSpace+1, secondSpace));
    move.from = parseInt(data[i].substring(from+5, to-1));
    move.to = parseInt(data[i].substring(to+3));
    instructions.push(move);
  }

  return {crates, instructions};

}


let problemOne = () => {

  const data = readFileSync('./Day05/input.txt', 'utf-8').split(/\n/);

  let {crates, instructions} = parseData(data);

  for (let i = 0; i < instructions.length; i++) {

    for (let j = 0; j < instructions[i].number; j++) {
      crates[instructions[i].to - 1].push(crates[instructions[i].from - 1].pop());
    }
  }

  let topCrates = [];
  for(let i = 0; i < crates.length; i++) {
    topCrates.push(crates[i].pop());
  }

  return topCrates.join('');
}

let problemTwo = () => {

  const data = readFileSync('./Day05/input.txt', 'utf-8').split(/\n/);

  let {crates, instructions} = parseData(data);

  for (let i = 0; i < instructions.length; i++) {
    let temp = [];
    for (let j = 0; j < instructions[i].number; j++) {
      temp.push(crates[instructions[i].from - 1].pop());
    }
    for (let j = 0; j < instructions[i].number; j++) {
      crates[instructions[i].to - 1].push(temp.pop());
    }
  }

  let topCrates = [];
  for(let i = 0; i < crates.length; i++) {
    topCrates.push(crates[i].pop());
  }

  return topCrates.join('');

}

module.exports = {problemOne, problemTwo};