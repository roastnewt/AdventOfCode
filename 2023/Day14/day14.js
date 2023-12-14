const {readFileSync} = require('fs');


function goNorth(platform) {
    const tiltedPlatform = [];
    for (let col = 0; col < platform[0].length; col++) {
        let currentRocks = 0;
        for (let row = platform.length - 1; row >= 0; row--) {
            if (tiltedPlatform[row] === undefined) {
                tiltedPlatform[row] = new Array(platform[0].length).fill('.')
            }
            if (platform[row][col] === 'O') {
                currentRocks++;
            }
            if (platform[row][col] === '#') {
                tiltedPlatform[row][col] = '#';
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row + i + 1][col] = 'O';
                }
                currentRocks = 0;
            }
            if (row === 0) {
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row + i][col] = 'O';
                }
            }
        }
    }
    return tiltedPlatform;
}

function goWest(platform) {
    const tiltedPlatform = [];
    for (let row = 0; row < platform.length; row++) {
        let currentRocks = 0;
        for (let col = platform[row].length - 1; col >= 0; col--) {
            if (tiltedPlatform[row] === undefined) {
                tiltedPlatform[row] = new Array(platform[0].length).fill('.')
            }
            if (platform[row][col] === 'O') {
                currentRocks++;
            }
            if (platform[row][col] === '#') {
                tiltedPlatform[row][col] = '#';
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row][col + i + 1] = 'O';
                }
                currentRocks = 0;
            }
            if (col === 0) {
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row][col + i] = 'O';
                }
            }
        }
    }
    return tiltedPlatform;

}

function goSouth(platform) {
    const tiltedPlatform = [];
    for (let col = 0; col < platform[0].length; col++) {
        let currentRocks = 0;
        for (let row = 0; row < platform.length; row++) {
            if (tiltedPlatform[row] === undefined) {
                tiltedPlatform[row] = new Array(platform[0].length).fill('.')
            }
            if (platform[row][col] === 'O') {
                currentRocks++;
            }
            if (platform[row][col] === '#') {
                tiltedPlatform[row][col] = '#';
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row - i - 1][col] = 'O';
                }
                currentRocks = 0;
            }
            if (row === platform.length - 1) {
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row - i][col] = 'O';
                }
            }
        }
    }
    return tiltedPlatform;
}

function goEast(platform) {
    const tiltedPlatform = [];
    for (let row = 0; row < platform.length; row++) {
        let currentRocks = 0;
        for (let col = 0; col < platform[row].length; col++) {
            if (tiltedPlatform[row] === undefined) {
                tiltedPlatform[row] = new Array(platform[0].length).fill('.')
            }
            if (platform[row][col] === 'O') {
                currentRocks++;
            }
            if (platform[row][col] === '#') {
                tiltedPlatform[row][col] = '#';
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row][col - i - 1] = 'O';
                }
                currentRocks = 0;
            }
            if (col === platform[row].length - 1) {
                for (let i = 0; i < currentRocks; i++) {
                    tiltedPlatform[row][col - i] = 'O';
                }
            }
        }
    }
    return tiltedPlatform;
}

function scorePlatform(platform) {
    let score = 0;
    for (let row = 0; row < platform.length; row++) {
        for (let col = 0; col < platform[0].length; col++) {
            score += platform[row][col] === 'O' ? (platform.length - row) : 0;
        }
    }

    return score;
}


let problemOne = () => {
    const data = readFileSync('./Day14/input.txt', 'utf-8').split(/\r\n/);
    const lines = [];
    for (let line of data) {
        lines.push(line.split(''));
    }

    const tiltedPlatform = goNorth(lines);

    return scorePlatform(tiltedPlatform);

}

let problemTwo = () => {
    const data = readFileSync('./Day14/input.txt', 'utf-8').split(/\r\n/);
    const lines = [];
    for (let line of data) {
        lines.push(line.split(''));
    }

    let tiltedPlatform = goEast(goSouth(goWest(goNorth(lines))));
    let previousPlatforms = [];
    previousPlatforms.push(tiltedPlatform);
    let previousScores = [];
    previousScores.push(scorePlatform(tiltedPlatform));
    let cycleLength = -1;
    let offset = -1;
    for (let i = 0; i < 1000000000; i++) {
        tiltedPlatform = goEast(goSouth(goWest(goNorth(tiltedPlatform))));
        for (let j = 0; j < previousPlatforms.length; j++) {
            if (JSON.stringify(previousPlatforms[j]) === JSON.stringify(tiltedPlatform)) {
                if (cycleLength === -1) {
                    cycleLength = i - j + 1;
                    offset = j;
                }
                break;
            }
        }
        previousPlatforms.push(tiltedPlatform);
        previousScores.push(scorePlatform(tiltedPlatform));
        if (cycleLength !== -1) {
            break;
        }
    }
    let distanceFromCycle = ((1000000000 - 1 - offset) % cycleLength);
    return scorePlatform(previousPlatforms[offset + distanceFromCycle])
}

module.exports = {problemOne, problemTwo};