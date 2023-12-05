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

function scoreCards(cards) {
  
  let result = [];
  cards.forEach(line => {
    let score = 0;
    line.winners.forEach(winner => {
      if (line.actual.includes(winner)) {
        score++
      }
    })
    result.push(score)
  })
  return result;
}

let problemTwo = () => {

  let data = readFileSync('./Day04/input.txt', 'utf-8').split(/\n/);

  const parsed = data.map(line => {
    let winners = line.split(':')[1].split('|')[0].trim().split(' ').filter(x => x !== ' ' && x !== '');
    let actual = line.split('|')[1].trim().split(' ').filter(x => x !== ' ' && x !== '');
    return {winners, actual};
  })
  
  const scores = scoreCards(parsed);
  let totalCards = 0;
  
  function recurse(cardNumbersToProcess) {
    if (cardNumbersToProcess.length === 0) return;
    const nextCardNumbersToProcess = [];
    cardNumbersToProcess.forEach(cardNumber => {
        totalCards++;
        let score = scores[cardNumber];
        for(let i = 0; i < score; i++) {
            nextCardNumbersToProcess.push(cardNumber+i+1)
        }
    }
    );
    recurse(nextCardNumbersToProcess);
  }
  
  const cardNumbersToProcess = [];
  for (let i = 0; i < scores.length; i++) {
    cardNumbersToProcess.push(i);
  }
    recurse(cardNumbersToProcess);
  return totalCards;
  
  
  
}

module.exports = {problemOne, problemTwo};