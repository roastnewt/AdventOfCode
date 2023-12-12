const {readFileSync} = require('fs');

let problemOne = () => {
    const data = readFileSync('./Day11/input.txt', 'utf-8').split(/\r\n/);
    const universe = [];
    for (const element of data) {
        universe.push(element.split(''));
    }
    const expandedHorizUniverse = [];
    for (let row of universe) {
        expandedHorizUniverse.push(row);
        if (!row.includes('#')) {
            expandedHorizUniverse.push(row);
        }
    }

    const expandedUniverse = [];
    for (let i = 0; i < expandedHorizUniverse.length; i++) {
        expandedUniverse.push([]);
    }
    for (let col = 0; col < expandedHorizUniverse[0].length; col++) {
        let containsHash = false;
        for (let row = 0; row < expandedHorizUniverse.length; row++) {
            expandedUniverse[row].push(expandedHorizUniverse[row][col]);
            if (expandedHorizUniverse[row][col] === '#') {
                containsHash = true;
            }
        }
        if (!containsHash) {
            for (let row = 0; row < expandedHorizUniverse.length; row++) {
                expandedUniverse[row].push('.');
            }
        }
    }

    const hashLocations = [];
    for (let row = 0; row < expandedUniverse.length; row++) {
        for (let col = 0; col < expandedUniverse[0].length; col++) {
            if (expandedUniverse[row][col] === '#') {
                hashLocations.push({row, col})
            }
        }
    }

    let totalDistance = 0;
    for (let i = 0; i < hashLocations.length - 1; i++) {
        for (let j = i + 1; j < hashLocations.length; j++) {
            totalDistance += Math.abs(hashLocations[i].row - hashLocations[j].row) + Math.abs(hashLocations[i].col - hashLocations[j].col);
        }
    }

    return totalDistance;
}


let problemTwo = () => {
    let data = readFileSync('./Day11/input.txt', 'utf-8').split(/\n/);
    return -1;
}

module.exports = {problemOne, problemTwo};