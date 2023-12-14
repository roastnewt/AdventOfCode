const {readFileSync} = require('fs');
let problemOne = () => {
    const data = readFileSync('./Day14/input.txt', 'utf-8').split(/\r\n/);
    const lines = [];
    for (let line of data) {
        lines.push(line.split(''));
    }

    const tiltedPlatform = [];
    for (let col = 0; col < lines[0].length; col++) {
        let currentRocks = 0;
        for (let row = lines.length - 1; row >= 0; row--) {
            if (tiltedPlatform[row] === undefined) {
                tiltedPlatform[row] = new Array(lines[0].length).fill('.')
            }
            if (lines[row][col] === 'O') {
                currentRocks++;
            }
            if (lines[row][col] === '#') {
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

    let score = 0;
    for (let row = 0; row < tiltedPlatform.length; row++) {
        for (let col = 0; col < tiltedPlatform[0].length; col++) {
            score += tiltedPlatform[row][col] === 'O' ? (tiltedPlatform.length - row) : 0;
        }
    }

    return score;

}

let problemTwo = () => {
    const data = readFileSync('./Day14/input.txt', 'utf-8').split(/\r\n/);

}

module.exports = {problemOne, problemTwo};