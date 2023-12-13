const {readFileSync} = require('fs');

function parseInput(data) {
    const patterns = [];
    let currentPattern = [];
    for (let datum of data) {
        if (datum === '') {
            patterns.push(currentPattern);
            currentPattern = [];
        } else {
            currentPattern.push(datum.split(''));
        }
    }
    return patterns;
}

function recordValidPivotsForLine(line, pivots) {
    for (let pivot = 0; pivot < line.length - 1; pivot++) {
        let isPalindrome = true;
        for (let i = 1; i < line.length; i++) {
            let left = pivot - i + 1;
            let right = pivot + i;
            if (left < 0 || right >= line.length) {
                break;
            }
            if (line[left] !== line[right]) {
                isPalindrome = false;
                break;
            }
        }
        if (isPalindrome) {
            //console.log(`Line ${line} has a palindrome at index ${pivot}`)
            if (pivots[pivot] === undefined) {
                pivots[pivot] = 1;
            } else {
                pivots[pivot]++;
            }
        }
    }
}

function flipPattern(pattern) {
    let flippedPattern = [];
    for (let line of pattern) {
        for (let i = 0; i < line.length; i++) {
            if (flippedPattern[i] === undefined) {
                flippedPattern[i] = [];
            }
            flippedPattern[i].push(line[i]);
        }
    }
    return flippedPattern;
}

function findPivotScore(pattern, originalScore = null) {
    let pivots = {};
    for (let line of pattern) {
        recordValidPivotsForLine(line, pivots)
    }
    for (let pivot in pivots) {
        if (pivots[pivot] === pattern.length) {
            let newScore = parseInt(pivot) + 1;
            if (newScore !== originalScore) {
                return newScore;
            }
        }
    }
    const flippedPattern = flipPattern(pattern);
    let horizontalPivots = {};
    for (let line of flippedPattern) {
        recordValidPivotsForLine(line, horizontalPivots)
    }
    for (let pivot in horizontalPivots) {
        if (horizontalPivots[pivot] === flippedPattern.length) {
            let newScore = (parseInt(pivot) + 1) * 100;
            if (newScore !== originalScore) {
                return newScore;
            }
        }
    }

    return null;
}

let problemOne = () => {
    const data = readFileSync('./Day13/input.txt', 'utf-8').split(/\r\n/);
    const patterns = parseInput(data)

    let summary = 0;
    for (let pattern of patterns) {
        summary += findPivotScore(pattern);
    }
    return summary;
}

function tryFlipBitsScore(pattern) {
    let originalScore = findPivotScore(pattern);
    for (const line of pattern) {
        for (let j = 0; j < line.length; j++) {
            if (line[j] === '.') {
                line[j] = '#';
            } else {
                line[j] = '.';
            }
            let pivot = findPivotScore(pattern, originalScore);
            if (line[j] === '.') {
                line[j] = '#';
            } else {
                line[j] = '.';
            }
            if (pivot !== null) {
                return pivot;
            }
        }
    }

}

let problemTwo = () => {
    const data = readFileSync('./Day13/input.txt', 'utf-8').split(/\r\n/);
    const patterns = parseInput(data)

    let summary = 0;
    for (let pattern of patterns) {
        summary += tryFlipBitsScore(pattern);
    }
    return summary;
}

module.exports = {problemOne, problemTwo};