const {readFileSync} = require('fs');

let problemOne = (length = 4) => {

  let data = readFileSync('./Day06/input.txt', 'utf-8').split(/\n/);
  data = data[0].split('');

  let front = 1;
  let back = 0;
  let code = [data[back]];

  while (front - back < length) {
    if (code.includes(data[front])) {
      while (code.includes(data[front])) {
        code.shift();
        back++;
      }
    }
    code.push(data[front]);
    front++;
  }

  return front;

}

let problemTwo = () => {

  const data = readFileSync('./Day06/input.txt', 'utf-8').split(/\n/);

  return problemOne(14);

}

module.exports = {problemOne, problemTwo};