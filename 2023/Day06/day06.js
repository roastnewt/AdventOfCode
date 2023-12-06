const {readFileSync} = require('fs');


const races = [[59, 597], [79, 1234], [65, 1032], [75, 1328]]
//const races = [[7, 9], [15, 40], [30, 200]]
let problemOne = () => {
  let total = 1;
  for (let race of races) {
    const [raceTime, bestDistance] = race
    let lowZero = (raceTime - Math.sqrt(raceTime*raceTime - 4*bestDistance))/2;
    let highZero = (raceTime + Math.sqrt(raceTime*raceTime - 4*bestDistance))/2;
    
    lowZero = Math.ceil(lowZero);
    highZero = Math.floor(highZero);

    total *= (highZero - lowZero + 1);
  }
  return total;
}

let problemTwo = () => {
  const [raceTime, bestDistance] = [59796575, 597123410321328]
  let lowZero = (raceTime - Math.sqrt(raceTime*raceTime - 4*bestDistance))/2;
  let highZero = (raceTime + Math.sqrt(raceTime*raceTime - 4*bestDistance))/2;

  lowZero = Math.ceil(lowZero);
  highZero = Math.floor(highZero);

  return (highZero - lowZero + 1);
}

module.exports = {problemOne, problemTwo};