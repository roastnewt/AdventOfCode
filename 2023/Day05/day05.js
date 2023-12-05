const {readFileSync} = require('fs');


const readAndParseInput = () => {
  const data = readFileSync('./Day05/input.txt', 'utf-8').split(/\r\n/);
  const result = {};
  let currentKey = 'seeds'
  for(const line of data) {
    if (line.startsWith('seeds: ')) {
      result.seeds = line.split(': ')[1].split(' ').map(x => parseInt(x));
    } else if (line.startsWith('seed-to-soil map:')) {
      currentKey = 'seedToSoilMap';
      result[currentKey] = [];
    } else if (line.startsWith('soil-to-fertilizer map:')) {
      currentKey = 'soilToFertilizerMap';
      result[currentKey] = [];
    } else if (line.startsWith('fertilizer-to-water map:')) {
      currentKey = 'fertilizerToWaterMap';
      result[currentKey] = [];
    } else if (line.startsWith('water-to-light map:')) {
      currentKey = 'waterToLightMap';
      result[currentKey] = [];
    } else if (line.startsWith('light-to-temperature map:')) {
      currentKey = 'lightToTemperatureMap';
      result[currentKey] = [];
    } else if (line.startsWith('temperature-to-humidity map:')) {
      currentKey = 'temperatureToHumidityMap';
      result[currentKey] = [];
    } else if (line.startsWith('humidity-to-location map:')) {
      currentKey = 'humidityToLocationMap';
      result[currentKey] = [];
    } else if (line.trim() === '') {
      //skip
    } else {
      result[currentKey].push(line.split(' ').map(x => parseInt(x)));
    }
  }
  return result;
}

let problemOne = () => {
  let data = readAndParseInput();
  let results = [];
  for(const seed of data.seeds) {
    let current = seed;
    for (const key in data) {
      if (key === 'seeds') continue;
      for (const map of data[key]) {
        const [destStart, sourceStart, range] = map
        const diff = current - sourceStart;
        if (diff >= 0 && diff < range) {
          current = (diff + destStart);
          break;
        }
      }
    }
    results.push(current);
  }
  
  results.sort((a,b) => a-b);
  //836040384
  return results[0];
  
}

let problemTwo = () => {

  let data = readFileSync('./Day05/input.txt', 'utf-8').split(/\n/);
  
}

module.exports = {problemOne, problemTwo};