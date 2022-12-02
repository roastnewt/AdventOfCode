const {readFileSync} = require('fs');

problemOne = () => {

  const data = readFileSync('./Day01/input.txt', 'utf-8').split(/\n/);

  let current = 0;
  let max = 0;
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i] != '') {
      current += parseInt(data[i]);
    } else {
      if (current > max) {
        max = current;
        console.log('New Max! ' + max + ': ' + i);
      }
      current = 0;
    }
  }

  return max;

}

module.exports = {problemOne};