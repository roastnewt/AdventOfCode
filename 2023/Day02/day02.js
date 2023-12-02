const {readFileSync} = require('fs');

let parseData = (data) => {
  const parsed = [];
  data.forEach((line) => {
    let input = {};
    input.gameNumber = parseInt(line.split(':')[0].slice(4));
    let games = line.split(': ')[1].split('; ')
    input.games = [];
    games.forEach((game) => {
        let gameData = {};
        let colorData = game.split(', ');
        colorData.forEach((color) => {
          let colorName = color.split(' ')[1];
          gameData[colorName] = parseInt(color.split(' ')[0]);
        });
        input.games.push(gameData)
    })
    parsed.push(input);
  })
  return parsed;
}
let problemOne = () => {

  const data = readFileSync('./Day02/input.txt', 'utf-8').split(/\n/);
  
  let games = parseData(data);

  let total = 0;
  games.forEach((game) => {
    let impossible = false;
    game.games.forEach(round => {
      impossible ||= round.red > 12 || round.green > 13 || round.blue > 14; 
    })
    if (!impossible) total += game.gameNumber;
  })
  
  return total;

}

let problemTwo = () => {

  const data = readFileSync('./Day02/input.txt', 'utf-8').split(/\n/);

  let games = parseData(data);

  let total = 0;
  games.forEach((game) => {
    let maximums = {red: 0, green: 0, blue: 0};
    game.games.forEach(round => {
        maximums.red = Math.max(maximums.red ?? 0, round.red ?? 0)
        maximums.green = Math.max(maximums.green ?? 0, round.green ?? 0)
        maximums.blue = Math.max(maximums.blue ?? 0, round.blue ?? 0)
    })
    total += (maximums.red)*(maximums.green)*(maximums.blue);
  })

  return total;
}

module.exports = {problemOne, problemTwo};