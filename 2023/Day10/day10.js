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

let problemOne = () => {
    let data = readFileSync('./Day10/input.txt', 'utf-8').split(/\n/);
    const map = [];
    for (let datum of data) {
        map.push(datum.split(''));
    }
    const sLoc = findS(map);

    for (let direction of ['right', 'left', 'up', 'down']) {
        let ans = null;
        let loopNum = 0;
        let dist = 1;
        let prev = {x: sLoc.x, y: sLoc.y};
        let curr;
        switch (direction) {
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
            return Math.floor(ans / 2);
        }
    }

    return -1;
}


let problemTwo = () => {
    let data = readFileSync('./Day10/input.txt', 'utf-8').split(/\n/);
    const map = [];
    const modifiedMap = [];
    for (let datum of data) {
        const datumArray = datum.split('');
        map.push(datumArray);
        modifiedMap.push(new Array(datumArray.length).fill('#'));
    }
    const sLoc = findS(map);

    let ans = null;
    let loopNum = 0;
    let dist = 1;
    let prev = {x: sLoc.x, y: sLoc.y};
    let curr = {x: sLoc.x, y: sLoc.y - 1}; //go left only, that's what we know it is
    while (!ans) {
        if (loopNum > 1000000) {
            console.log('looping too much');
            break;
        }
        modifiedMap[curr.x][curr.y] = map[curr.x][curr.y];
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
            modifiedMap[curr.x][curr.y] = 'S';
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

    let insides = 0;
    for (let x = 0; x < modifiedMap.length; x++) {
        let amInside = false;
        for (let y = 0; y < modifiedMap[x].length; y++) {
            if (modifiedMap[x][y] === "|" || modifiedMap[x][y] === "F" || modifiedMap[x][y] === "7" || modifiedMap[x][y] === "S") {
                amInside = !amInside;
            } else if (amInside && modifiedMap[x][y] === "#") {
                insides++;
            }
        }
    }
    return insides;
    // not 80
    // not 38
    // not 4
    // not 273
    // not 44
    // not 43?
}

module.exports = {problemOne, problemTwo};