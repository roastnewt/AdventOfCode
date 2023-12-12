const {readFileSync} = require('fs');

let findS = (map) => {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === 'S') {
        return {x, y};
      }
    }
  }
  throw new Error('No S found');
}

let buildDistanceMap = (map, distanceMap, sLoc) => {
    const queue = [];
    queue.push(sLoc);
    distanceMap[sLoc.x][sLoc.y] = 0;
    while(queue.length > 0){
        const {x, y} = queue.shift();
        const currentDistance = distanceMap[x][y];
        const currentSymbol = map[x][y];
        if (currentSymbol === 'S') {
            if (x > 0 && distanceMap[x - 1][y] === -1) {
                if(map[x-1][y] === '|' || 'F' || '7') {
                    distanceMap[x - 1][y] = currentDistance + 1;
                    queue.push({x: x - 1, y});
                }
            }
            if (x < map.length - 1 && distanceMap[x + 1][y] === -1) {
                if (map[x + 1][y] === '|' || 'J' || 'L') {
                    distanceMap[x + 1][y] = currentDistance + 1;
                    queue.push({x: x + 1, y});
                }
            }
            if (y > 0 && distanceMap[x][y - 1] === -1) {
                if (map[x][y - 1] === '-' || 'F' || 'L') {
                    distanceMap[x][y - 1] = currentDistance + 1;
                    queue.push({x, y: y - 1});
                }
            }
            if (y < map[x].length - 1 && distanceMap[x][y + 1] === -1) {
                if (map[x][y + 1] === '-' || 'J' || '7') {
                    distanceMap[x][y + 1] = currentDistance + 1;
                    queue.push({x, y: y + 1});
                }
            }
        }
        if (currentDistance > 1 && currentSymbol === '|' && x > 0 && map[x - 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === '|' && x < map.length - 1 && map[x + 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === '-' && y > 0 && map[x][y - 1] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === '-' && y < map[x].length - 1 && map[x][y + 1] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'L' && x > 0 && map[x - 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'L' && y < map[x].length - 1 && map[x][y + 1] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'J' && x > 0 && map[x - 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'J' && y > 0 && map[x][y - 1] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === '7' && x < map.length - 1 && map[x + 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === '7' && y > 0 && map[x][y - 1] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'F' && x < map.length - 1 && map[x + 1][y] === 'S') {
            return currentDistance + 1;
        }
        if (currentDistance > 1 && currentSymbol === 'F' && y < map[x].length - 1 && map[x][y + 1] === 'S') {
            return currentDistance + 1;
        }
        
        if(currentSymbol === '|' && x > 0 && distanceMap[x-1][y] === -1){
            if (map[x-1][y] === '|' || map[x-1][y] === 'F' || map[x-1][y] === '7') {
                distanceMap[x - 1][y] = currentDistance + 1;
                queue.push({x: x - 1, y});
            }
        }
        if (currentSymbol === '|' && x < map.length - 1 && distanceMap[x + 1][y] === -1) {
            if (map[x + 1][y] === '|' || map[x + 1][y] === 'J' || map[x + 1][y] === 'L') {
                distanceMap[x + 1][y] = currentDistance + 1;
                queue.push({x: x + 1, y});
            }
        }
        if (currentSymbol === '-' && y > 0 && distanceMap[x][y - 1] === -1) {
            if (map[x][y - 1] === '-' || map[x][y - 1] === 'F' || map[x][y - 1] === 'L') {
                distanceMap[x][y - 1] = currentDistance + 1;
                queue.push({x, y: y - 1});
            }
        }
        if (currentSymbol === '-' && y < map[x].length - 1 && distanceMap[x][y + 1] === -1) {
            if (map[x][y + 1] === '-' || map[x][y + 1] === 'J' || map[x][y + 1] === '7') {
                distanceMap[x][y + 1] = currentDistance + 1;
                queue.push({x, y: y + 1});
            }
        }
        if (currentSymbol === 'L' && x > 0 && distanceMap[x - 1][y] === -1) {
            if (map[x - 1][y] === '|' || map[x - 1][y] === 'F' || map[x - 1][y] === '7') {
                distanceMap[x - 1][y] = currentDistance + 1;
                queue.push({x: x - 1, y});
            }
        }
        if (currentSymbol === 'L' && y < map[x].length - 1 && distanceMap[x][y + 1] === -1) {
            if (map[x][y + 1] === '-' || map[x][y + 1] === 'J' || map[x][y + 1] === '7') {
                distanceMap[x][y + 1] = currentDistance + 1;
                queue.push({x, y: y + 1});
            }
        }
        if (currentSymbol === 'J' && x > 0 && distanceMap[x - 1][y] === -1) {
            if (map[x - 1][y] === '|' || map[x - 1][y] === 'F' || map[x - 1][y] === '7') {
                distanceMap[x - 1][y] = currentDistance + 1;
                queue.push({x: x - 1, y});
            }
        }
        if (currentSymbol === 'J' && y > 0 && distanceMap[x][y - 1] === -1) {
            if (map[x][y - 1] === '-' || map[x][y - 1] === 'F' || map[x][y - 1] === 'L') {
                distanceMap[x][y - 1] = currentDistance + 1;
                queue.push({x, y: y - 1});
            }
        }
        if (currentSymbol === '7' && x < map.length - 1 && distanceMap[x + 1][y] === -1) {
            if (map[x + 1][y] === '|' || map[x + 1][y] === 'J' || map[x + 1][y] === 'L') {
                distanceMap[x + 1][y] = currentDistance + 1;
                queue.push({x: x + 1, y});
            }
        }
        if (currentSymbol === '7' && y > 0 && distanceMap[x][y - 1] === -1) {
            if (map[x][y - 1] === '-' || map[x][y - 1] === 'F' || map[x][y - 1] === 'L') {
                distanceMap[x][y - 1] = currentDistance + 1;
                queue.push({x, y: y - 1});
            }
        }
        if (currentSymbol === 'F' && x < map.length - 1 && distanceMap[x + 1][y] === -1) {
            if (map[x + 1][y] === '|' || map[x + 1][y] === 'J' || map[x + 1][y] === 'L') {
                distanceMap[x + 1][y] = currentDistance + 1;
                queue.push({x: x + 1, y});
            }
        }
        if (currentSymbol === 'F' && y < map[x].length - 1 && distanceMap[x][y + 1] === -1) {
            if (map[x][y + 1] === '-' || map[x][y + 1] === 'J' || map[x][y + 1] === '7') {
                distanceMap[x][y + 1] = currentDistance + 1;
                queue.push({x, y: y + 1});
            }
        }
    }
    console.log(distanceMap)
    return -1;
    //return distanceMap;
}

let problemOne = () => {
  let data = readFileSync('./Day10/input.txt', 'utf-8').split(/\n/);
  const map = [];
  let squareNumber = 0;
  for(let datum of data){
    map.push(datum.split(''));
  }
  const sLoc = findS(map);
  
    for (let direction of ['right', 'left', 'up', 'down']) {
        let ans = null;
        let loopNum = 0;
        let dist = 1;
        let prev = {x: sLoc.x, y: sLoc.y};
        let curr;
        switch(direction) {
            case 'right':
                curr = {x: sLoc.x, y: sLoc.y + 1};
                console.log('checking right...')
                break;
            case 'left':
                curr = {x: sLoc.x, y: sLoc.y - 1};
                console.log('checking left...')
                break;
            case 'up':
                curr = {x: sLoc.x - 1, y: sLoc.y};
                console.log('checking up...')
                break;
            case 'down':
                curr = {x: sLoc.x + 1, y: sLoc.y};
                console.log('checking down...')
                break;
        }
        while (!ans) {
            if (loopNum > 1000000) {
                console.log('looping too much');
                break;
            }
            if (curr.x < 0 || curr.x >= map.length || curr.y < 0 || curr.y >= map[curr.x].length) {
                ans = -1;
                break;
            }
            let currentSymbol = map[curr.x][curr.y];
            if (currentSymbol === '.') {
                ans = -1;
                break;
            }
            if (currentSymbol === 'S') {
                ans = dist;
                break;
            }
            if (currentSymbol === '|') {
                if (prev.x === curr.x - 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x + 1, y: curr.y};
                    continue;
                }
                if (prev.x === curr.x + 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x - 1, y: curr.y};
                    continue;
                }
                ans = -1;
                break;
            }
            if (currentSymbol === '-') {
                if (prev.x === curr.x && prev.y === curr.y - 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y + 1};
                    continue;
                }
                if (prev.x === curr.x && prev.y === curr.y + 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y - 1};
                    continue;
                }
                ans = -1;
                break;
            }
            if (currentSymbol === 'L') {
                if (prev.x === curr.x - 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y + 1};
                    continue;
                }
                if (prev.x === curr.x && prev.y === curr.y + 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x - 1, y: curr.y};
                    continue;
                }
                ans = -1;
                break;
            }
            if (currentSymbol === 'J') {
                if (prev.x === curr.x - 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y - 1};
                    continue;
                }
                if (prev.x === curr.x && prev.y === curr.y - 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x - 1, y: curr.y};
                    continue;
                }
                ans = -1;
                break;
            }
            if (currentSymbol === '7') {
                if (prev.x === curr.x + 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y - 1};
                    continue;
                }
                if (prev.x === curr.x && prev.y === curr.y - 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x + 1, y: curr.y};
                    continue;
                }
                ans = -1;
                break;
            }
            if (currentSymbol === 'F') {
                if (prev.x === curr.x + 1 && prev.y === curr.y) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x, y: curr.y + 1};
                    continue;
                }
                if (prev.x === curr.x && prev.y === curr.y + 1) {
                    dist = dist + 1;
                    prev = curr;
                    curr = {x: curr.x + 1, y: curr.y};
                    continue;
                }
                ans = -1;
                break;
            }
            console.log('found strange symbol: ', `"${currentSymbol}"`);
            break;
        }

        if (ans > 0) {
            return Math.floor(ans/2);
        }
    }
  
  return -1;
}

let problemTwo = () => {
  let data = readFileSync('./Day10/input.txt', 'utf-8').split(/\n/);
}

module.exports = {problemOne, problemTwo};