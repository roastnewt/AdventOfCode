const {readFileSync} = require('fs');

let problemOne = () => {

  const data = readFileSync('./Day02/input.txt', 'utf-8').split(/\n/);

  let score = 0;

  for (let i = 0; i < data.length; ++i) {

    let opponent = data[i][0];
    let myself = data[i][2];

    switch(myself) {
      case 'X':
        score += 1;
        if (opponent === 'C') {
          score += 6;
        } else if (opponent === 'A') {
          score += 3;
        }
        break;
      case 'Y':
        score += 2;
        if (opponent === 'A') {
          score += 6;
        } else if (opponent === 'B') {
          score += 3;
        }
        break;
      case 'Z':
        score += 3;
        if (opponent === 'B') {
          score += 6;
        } else if (opponent === 'C') {
          score += 3;
        }
        break;
    }

  }

  return score;

}

let problemTwo = () => {

  return null;

}

module.exports = {problemOne, problemTwo};