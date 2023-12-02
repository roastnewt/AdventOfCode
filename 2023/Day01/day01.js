const {readFileSync} = require('fs');

let problemOne = (input) => {

  const data = input ?? readFileSync('./Day01/input.txt', 'utf-8').split(/\n/);

  return data.reduce((acc, val) => {
    let charArray = val.split('')
    let firstDigit = charArray.find((char) => !isNaN(parseInt(char)))
    let secondDigit = charArray.findLast((char) => !isNaN(parseInt(char)))
    return acc + parseInt(firstDigit + secondDigit);
  }, 0)

}

let problemTwo = () => {

  let data = readFileSync('./Day01/input.txt', 'utf-8')
  data = data.replaceAll('one', 'o1e');
  data = data.replaceAll('two', 't2o');
  data = data.replaceAll('three', 't3e');
  data = data.replaceAll('four', 'f4r');
  data = data.replaceAll('five', 'f5e');
  data = data.replaceAll('six', 's6x');
  data = data.replaceAll('seven', 's7n');
  data = data.replaceAll('eight', 'e8t');
  data = data.replaceAll('nine', 'n9e');
  data = data.split(/\n/);
  
  return problemOne(data)
}

module.exports = {problemOne, problemTwo};