const {readFileSync} = require('fs');


const readAndParseInput = (problemNum) => {
  const data = readFileSync('./Day05/input.txt', 'utf-8').split(/\r\n/);
  const result = {};
  let currentKey = 'seeds'
  for(const line of data) {
    if (line.startsWith('seeds: ')) {
      const nums = line.split(': ')[1].split(' ').map(x => parseInt(x));
      if (problemNum === 1) {
        result.seeds = nums
      } else {
        result.seeds = [];
        for(let i = 0; i < nums.length; i = i+2) {
          result.seeds.push([nums[i], nums[i+1]])
        }
      }
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
  let data = readAndParseInput(1);
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

// missing soln for non mapped ranges
// let problemTwo = () => {
//   let data = readAndParseInput(2);
//   let results = [];
//   for(const seed of data.seeds) {
//     let currentStart = seed[0];
//     let currentRange = seed[1];
//     for (const key in data) {
//       if (key === 'seeds') continue;
//       for (const map of data[key]) {
//         const [destStart, sourceStart, range] = map
//         if (currentStart + currentRange > sourceStart && currentStart < sourceStart + range) {
//           // has overlap
//           // find transform
//           const diff = destStart-sourceStart;
//           // restrict range
//           const boundaries = [currentStart, currentStart+currentRange-1, sourceStart, sourceStart+range-1];
//           boundaries.sort((a,b) => a-b);
//           // transform range
//           currentStart = boundaries[1] + diff;
//           currentRange = boundaries[2] - boundaries[1] - 1;
//           break;
//         }
//       }
//     }
//     results.push([currentStart, currentRange]);
//   }
//  
//   results.sort((a,b) => a[0]-b[0]);
//   console.log(results)
//  
//   //467405785 too high
//   //37405178 too high
//   return results[0][0];
// }

let problemTwo = () => {
  let data = readAndParseInput(2);
  let results = [];
  for(const seed of data.seeds) {
    let currentIntervals = [[seed[0], seed[1]]];
    for (const key in data) {
      if (key === 'seeds') continue;
      let nextIntervals = [];
      for (const currentInterval of currentIntervals) {
        for (const map of data[key]) {
          const [destStart, sourceStart, range] = map
          const [currentStart, currentRange] = currentInterval;
          // if has overlap
          if (currentStart + currentRange > sourceStart && currentStart < sourceStart + range) {
            // find transform
            const diff = destStart - sourceStart;
            // restrict range to just overlap
            const boundaries = [currentStart, currentStart + currentRange - 1, sourceStart, sourceStart + range - 1];
            boundaries.sort((a, b) => a - b);
            // transform range
            nextIntervals.push([boundaries[1] + diff, boundaries[2] - boundaries[1] - 1])
            // add any of the beginning of initial range that was not transformed
            if (currentStart === boundaries[0]) { 
              nextIntervals.push([boundaries[0], boundaries[1] - boundaries[0] + 1])
            }
            // add any of the end of initial range that was not transformed
            if (currentStart + currentRange - 1 === boundaries[3]) {
              nextIntervals.push([boundaries[2], boundaries[3] - boundaries[2] + 1])
            }
          }
        }
      }
      currentIntervals = nextIntervals;
    }
    results.push(...currentIntervals);
  }

  results.sort((a,b) => a[0]-b[0]);
  
  //10834440!!!
  return results[0][0];
}

module.exports = {problemOne, problemTwo};