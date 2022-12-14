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

  const data = readFileSync('./Day02/input.txt', 'utf-8').split(/\n/);

  let score = 0;

  for (let i = 0; i < data.length; ++i) {

    let opponent = data[i][0];
    let win = data[i][2];

    switch(opponent) {
      case 'A':
        switch (win) {
          case 'X':
            score += 3;  //play scissors, lose
            break;
          case 'Y':
            score += 4; // play rock, tie
            break;
          case 'Z':
            score += 8; // play paper, win
            break;
        }
        break;
      case 'B':
        switch (win) {
          case 'X':
            score += 1;  //play rock, lose
            break;
          case 'Y':
            score += 5; // play paper, tie
            break;
          case 'Z':
            score += 9; // play scissors, win
            break;
        }
        break;
      case 'C':
        switch (win) {
          case 'X':
            score += 2;  //play paper, lose
            break;
          case 'Y':
            score += 6; // play scissors, tie
            break;
          case 'Z':
            score += 7; // play rock, win
            break;
        }
        break;
    }
  }

  return score;

}

module.exports = {problemOne, problemTwo};