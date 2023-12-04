const {readFileSync} = require('fs');

let problemOne = () => {

  const data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);
  
  const parsed = data.map(line => {
    let winners = line.split(':')[1].split('|')[0].trim().split(' ').filter(x => x !== ' ' && x !== '');
    let actual = line.split('|')[1].trim().split(' ').filter(x => x !== ' ' && x !== '');
    return {winners, actual};
  })
  
  let total = 0;
  parsed.forEach(line => {
    let score = null;
    console.log(line.winners, line.actual)
    line.winners.forEach(winner => {
      if (line.actual.includes(winner)) {
        score = score ? score*2 : 1;
      }
    })
    total += score;
  })
  
  //32202 too high
  return total;
}

let problemTwo = () => {

  let data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);
  
}

module.exports = {problemOne, problemTwo};