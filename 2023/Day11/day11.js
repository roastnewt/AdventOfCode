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
    const data = readFileSync('./Day11/input.txt', 'utf-8').split(/\r\n/);
    const universe = [];
    for (const element of data) {
        universe.push(element.split(''));
    }
    const expandedHorizUniverse = [];
    const columnsExpanded = new Set();
    const rowsExpanded = new Set();

    for (let row of universe) {
        expandedHorizUniverse.push(row);
        if (!row.includes('#')) {
            const newRow = [];
            for (let i = 0; i < row.length; i++) {
                newRow.push('@');
            }
            expandedHorizUniverse.push(newRow);
            rowsExpanded.add(expandedHorizUniverse.length - 1);
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
                expandedUniverse[row].push('@');
            }
            columnsExpanded.add(expandedUniverse[0].length - 1);
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
            let numExpandedRowsToCross = 0;
            for (let k = Math.min(hashLocations[i].row, hashLocations[j].row); k < Math.max(hashLocations[i].row, hashLocations[j].row); k++) {
                if (rowsExpanded.has(k)) {
                    numExpandedRowsToCross++;
                }
            }
            let numExpandedColsToCross = 0;
            for (let k = Math.min(hashLocations[i].col, hashLocations[j].col); k < Math.max(hashLocations[i].col, hashLocations[j].col); k++) {
                if (columnsExpanded.has(k)) {
                    numExpandedColsToCross++;
                }
            }
            totalDistance += Math.abs(hashLocations[i].row - hashLocations[j].row) - numExpandedRowsToCross * 2 + Math.abs(hashLocations[i].col - hashLocations[j].col) - numExpandedColsToCross * 2 + (numExpandedRowsToCross * 1000000) + (numExpandedColsToCross * 1000000);
        }
    }

    return totalDistance;
}

module.exports = {problemOne, problemTwo};