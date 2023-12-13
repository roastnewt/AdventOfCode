const {readFileSync} = require('fs');

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

let problemOne = () => {
    let summary = 0;

    const data = readFileSync('./Day13/input.txt', 'utf-8').split(/\r\n/);
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
    for (let pattern of patterns) {
        let pivots = {};
        for (let line of pattern) {
            recordValidPivotsForLine(line, pivots)
        }
        for (let pivot in pivots) {
            if (pivots[pivot] === pattern.length) {
                //console.log(`Pattern ${pattern} has a palindrome at index ${pivot}`);
                summary += (parseInt(pivot) + 1);
                //number of columns to the left is pivot + 1
            }
        }
        const flippedPattern = flipPattern(pattern);
        let horizontalPivots = {};
        for (let line of flippedPattern) {
            recordValidPivotsForLine(line, horizontalPivots)
        }
        for (let pivot in horizontalPivots) {
            if (horizontalPivots[pivot] === flippedPattern.length) {
                //console.log(`Pattern ${flippedPattern} has a palindrome at index ${pivot}`);
                summary += (parseInt(pivot) + 1) * 100;
                //number of rows above (left) is pivot + 1
            }
        }

    }

    return summary;
}


let problemTwo = () => {
    const data = readFileSync('./Day13/input.txt', 'utf-8').split(/\r\n/);
}

module.exports = {problemOne, problemTwo};