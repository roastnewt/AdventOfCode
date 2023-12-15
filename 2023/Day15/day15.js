const {readFileSync} = require('fs');


function hashInput(input) {
    let currentValue = 0;
    for (let i = 0; i < input.length; i++) {
        currentValue += input.charCodeAt(i);
        currentValue *= 17
        currentValue %= 256;
    }
    return currentValue;
}

let problemOne = () => {
    const data = readFileSync('./Day15/input.txt', 'utf-8').split(',');
    let sum = 0;
    for (let datum of data) {
        sum += hashInput(datum);
    }
    return sum;
}

let problemTwo = () => {
    const data = readFileSync('./Day15/input.txt', 'utf-8').split(',');
    const boxes = new Array(256);
    for (let datum of data) {
        if (datum.includes('=')) {
            let [label, focalLength] = datum.split('=');
            focalLength = parseInt(focalLength);
            const hash = hashInput(label);
            const lens = {label, focalLength};
            if (boxes[hash] === undefined) {
                boxes[hash] = [];
            }
            if (boxes[hash].find(l => l.label === lens.label)) {
                boxes[hash].find(l => l.label === lens.label).focalLength = lens.focalLength;
                continue;
            }
            boxes[hash].push(lens);
        }
        if (datum.includes('-')) {
            let label = datum.substring(0, datum.indexOf('-'));
            let hash = hashInput(label);
            if (boxes[hash] === undefined) continue;
            boxes[hash] = boxes[hash].filter(l => l.label !== label);
        }
    }
    console.log(boxes);
    let sum = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] === undefined) continue;
        for (let j = 0; j < boxes[i].length; j++) {
            sum += (i + 1) * (j + 1) * boxes[i][j].focalLength;
        }
    }
    return sum;
}

module.exports = {problemOne, problemTwo};