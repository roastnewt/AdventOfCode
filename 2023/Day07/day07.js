const {readFileSync} = require('fs');

function scoreHand(hand) {
  const valueMap = new Map()
  for (let card of hand) {
    valueMap.set(card, (valueMap.get(card) || 0) + 1);
  }
  let cardQuantities = Array.from(valueMap.values());
  //five of a kind
  if (valueMap.size === 1) {
    return 7;
  }
  //four of a kind
  if (valueMap.size === 2 && cardQuantities.includes(4)) {
    return 6;
  }
  //full house
  if (cardQuantities.includes(3) && cardQuantities.includes(2)) {
    return 5;
  }
  //three of a kind
  if (cardQuantities.includes(3)) {
    return 4;
  }
  //two pair
  if (valueMap.size === 3 && cardQuantities.includes(2)) {
    // 3 types of cards, one is a pair, but not full house
    return 3;
  }
  //one pair
  if (valueMap.size === 4 && cardQuantities.includes(2)) {
    return 2;
  }
  if (valueMap.size === 5) {
    return 1;
  }
  
  console.log('unknown hand: ' + hand);
  return -1;
}

const cardValues = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];

let problemOne = () => {
  const hands = readFileSync('./Day07/input.txt', 'utf-8').split(/\r\n/).map(x => x.split(' '));
  for (let hand of hands) {
    hand.push(scoreHand(hand[0]));
  }
  hands.sort((hand1, hand2) => {
    if (hand1[2] !== hand2[2]) {
      return hand1[2] - hand2[2]
    } else {
        for (let i = 0; i < 5; i++) {
            if (cardValues.indexOf(hand1[0][i]) !== cardValues.indexOf(hand2[0][i])) {
            return cardValues.indexOf(hand1[0][i]) - cardValues.indexOf(hand2[0][i]);
            }
        }
    }
    
  });
  let winnings = 0;
  for (let i = 0; i < hands.length; i++) {
    let bet = parseInt(hands[i][1]);
    winnings += bet*(i + 1);
  }
  // 253205868
  return winnings;
}

function scoreHandJacksWild(hand) {
  const valueMap = new Map()
  for (let card of hand) {
    valueMap.set(card, (valueMap.get(card) || 0) + 1);
  }
  let cardQuantities = Array.from(valueMap.values());
  //five of a kind
  if (valueMap.size === 1 || (valueMap.size === 2 && valueMap.has('J'))) {
    return 7;
  }
  //four of a kind
  if ((valueMap.size === 2 && cardQuantities.includes(4)) ||
      (valueMap.get('J') === 1 && cardQuantities.includes(3)) ||
      (valueMap.get('J') === 2 && valueMap.size === 3) ||
      valueMap.get('J') === 3
  ) {
    return 6;
  }
  //full house
  if ((cardQuantities.includes(3) && cardQuantities.includes(2)) ||
      (valueMap.size === 3 && valueMap.has('J'))
  ) {
    return 5;
  }
  //three of a kind
  if (cardQuantities.includes(3) || 
      (valueMap.get('J') === 1 && cardQuantities.includes(2)) ||
      valueMap.get('J') === 2
  ){
    return 4;
  }
  //two pair
  if (valueMap.size === 3 && cardQuantities.includes(2)) {
    // any pair with a jack would be 3 of a kind, not two pair
    return 3;
  }
  //one pair
  if ((valueMap.size === 4 && cardQuantities.includes(2)) ||
      (valueMap.size === 5 && valueMap.has('J'))
  ) {
    return 2;
  }
  if (valueMap.size === 5) {
    return 1;
  }

  console.log('unknown hand: ' + hand);
  return -1;
}

const cardValuesJacksWild = ['J', '2','3','4','5','6','7','8','9','T','Q','K','A'];

let problemTwo = () => {
  const hands = readFileSync('./Day07/input.txt', 'utf-8').split(/\r\n/).map(x => x.split(' '));
  for (let hand of hands) {
    hand.push(scoreHandJacksWild(hand[0]));
  }
  hands.sort((hand1, hand2) => {
    if (hand1[2] !== hand2[2]) {
      return hand1[2] - hand2[2]
    } else {
      for (let i = 0; i < 5; i++) {
        if (cardValuesJacksWild.indexOf(hand1[0][i]) !== cardValuesJacksWild.indexOf(hand2[0][i])) {
          return cardValuesJacksWild.indexOf(hand1[0][i]) - cardValuesJacksWild.indexOf(hand2[0][i]);
        }
      }
    }

  });
  let winnings = 0;
  for (let i = 0; i < hands.length; i++) {
    let bet = parseInt(hands[i][1]);
    winnings += bet*(i + 1);
  }
  // 253907829
  return winnings;
}

module.exports = {problemOne, problemTwo};