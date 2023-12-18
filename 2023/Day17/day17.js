const {readFileSync} = require('fs');

const directions = [
    'right',
    'left',
    'up',
    'down'
];

let problemOne = () => {
    const data = readFileSync('./Day17/input.txt', 'utf-8').split(/\n/);
    const map = [];
    for (let datum of data) {
        map.push(datum.split('').map((char) => parseInt(char)));
    }
    let queue = [];
    let visited = new Set();

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (i === 0 && j === 0) {
                queue.push({
                    row: i,
                    col: j,
                    distance: 0,
                    previousDirection: "",
                    prev: null,
                });
            } else {
                for (let direction of directions) {
                    queue.push({
                        row: i,
                        col: j,
                        distance: Infinity,
                        previousDirection: direction,
                        prev: null,
                    });
                }
            }
        }
    }

    let mapLength = map.length;
    let mapWidth = map[0].length;
    let endNodes = queue.filter((node) => node.row === map.length - 1 && node.col === map[0].length - 1);

    let queueLengthStart = queue.length;
    let timeStart = Date.now();
    console.log(new Date())

    while (queue.length > 0) {
        if (queue.length % 1000 === 0) {
            let amtProcessed = queueLengthStart - queue.length;
            let amtRemaining = queue.length;
            console.log(`|${'='.repeat(Math.floor(amtProcessed / queueLengthStart * 30))}${' '.repeat(Math.floor(amtRemaining / queueLengthStart * 30))}|`)
            let eta = (((Date.now() - timeStart) / amtProcessed) * amtRemaining);
            let h, m, s;
            h = Math.floor(eta / 1000 / 60 / 60);
            m = Math.floor((eta / 1000 / 60 / 60 - h) * 60);
            s = Math.floor(((eta / 1000 / 60 / 60 - h) * 60 - m) * 60);
            let totalTime = Date.now() - timeStart;
            let h2, m2, s2;
            h2 = Math.floor(totalTime / 1000 / 60 / 60);
            m2 = Math.floor((totalTime / 1000 / 60 / 60 - h2) * 60);
            s2 = Math.floor(((totalTime / 1000 / 60 / 60 - h2) * 60 - m2) * 60);
            console.log(`amt remaining: ${amtRemaining} | elapsed: ${h2}:${m2}:${s2} | eta: ${h}:${m}:${s}`);
        }
        let currentNode = queue.sort((a, b) => b.distance - a.distance).pop();
        for (let direction of directions) {
            if (direction === currentNode.previousDirection) {
                continue;
            }
            if ((currentNode.previousDirection === 'up' && direction === 'down') ||
                (currentNode.previousDirection === 'down' && direction === 'up') ||
                (currentNode.previousDirection === 'left' && direction === 'right') ||
                (currentNode.previousDirection === 'right' && direction === 'left')) {
                //no backtracking
                continue;
            }
            let stepsDistance = 0;
            for (let steps = 1; steps <= 3; steps++) {
                let newRow = currentNode.row + (direction === 'up' ? -steps : direction === 'down' ? steps : 0);
                let newCol = currentNode.col + (direction === 'left' ? -steps : direction === 'right' ? steps : 0);
                if (newRow < 0 || newRow >= mapLength || newCol < 0 || newCol >= mapWidth) {
                    continue;
                }
                stepsDistance += map[newRow][newCol];
                let newDistance = currentNode.distance + stepsDistance;
                let neighbor = queue.find((node) => node.row === newRow && node.col === newCol && node.previousDirection === direction);
                if (neighbor === undefined) {
                    continue;
                }
                if (neighbor.distance > newDistance) {
                    neighbor.distance = newDistance;
                    neighbor.prev = currentNode;
                }
            }
        }
    }
    console.log(endNodes.map((node) => node.distance));
    let h, m, s;
    let totalTime = Date.now() - timeStart;
    h = Math.floor(totalTime / 1000 / 60 / 60);
    m = Math.floor((totalTime / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((totalTime / 1000 / 60 / 60 - h) * 60 - m) * 60);
    console.log(`total time: ${h}:${m}:${s}`);

    // for (let node of endNodes) {
    //     console.log(mapPath(node), node.distance)
    // }

    return Math.min(...endNodes.map((node) => node.distance));
}

let problemTwo = () => {
    const data = readFileSync('./Day17/input.txt', 'utf-8').split(/\n/);
    const map = [];
    for (let datum of data) {
        map.push(datum.split('').map((char) => parseInt(char)));
    }
    let queue = [];
    let visited = new Set();

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (i === 0 && j === 0) {
                queue.push({
                    row: i,
                    col: j,
                    distance: 0,
                    previousDirection: "",
                    prev: null,
                });
            } else {
                for (let direction of directions) {
                    queue.push({
                        row: i,
                        col: j,
                        distance: Infinity,
                        previousDirection: direction,
                        prev: null,
                    });
                }
            }
        }
    }

    let mapLength = map.length;
    let mapWidth = map[0].length;
    let endNodes = queue.filter((node) => node.row === map.length - 1 && node.col === map[0].length - 1);

    let queueLengthStart = queue.length;
    let timeStart = Date.now();
    console.log(new Date())

    while (queue.length > 0) {
        if (queue.length % 1000 === 0) {
            let amtProcessed = queueLengthStart - queue.length;
            let amtRemaining = queue.length;
            console.log(`|${'='.repeat(Math.floor(amtProcessed / queueLengthStart * 30))}${' '.repeat(Math.floor(amtRemaining / queueLengthStart * 30))}|`)
            let eta = (((Date.now() - timeStart) / amtProcessed) * amtRemaining);
            let h, m, s;
            h = Math.floor(eta / 1000 / 60 / 60);
            m = Math.floor((eta / 1000 / 60 / 60 - h) * 60);
            s = Math.floor(((eta / 1000 / 60 / 60 - h) * 60 - m) * 60);
            let totalTime = Date.now() - timeStart;
            let h2, m2, s2;
            h2 = Math.floor(totalTime / 1000 / 60 / 60);
            m2 = Math.floor((totalTime / 1000 / 60 / 60 - h2) * 60);
            s2 = Math.floor(((totalTime / 1000 / 60 / 60 - h2) * 60 - m2) * 60);
            console.log(`amt remaining: ${amtRemaining} | elapsed: ${h2}:${m2}:${s2} | eta: ${h}:${m}:${s}`);
        }
        let currentNode = queue.sort((a, b) => b.distance - a.distance).pop();
        for (let direction of directions) {
            if (direction === currentNode.previousDirection) {
                continue;
            }
            if ((currentNode.previousDirection === 'up' && direction === 'down') ||
                (currentNode.previousDirection === 'down' && direction === 'up') ||
                (currentNode.previousDirection === 'left' && direction === 'right') ||
                (currentNode.previousDirection === 'right' && direction === 'left')) {
                //no backtracking
                continue;
            }
            let stepsDistance = 0;
            for (let steps = 1; steps <= 3; steps++) {
                let newRow = currentNode.row + (direction === 'up' ? -steps : direction === 'down' ? steps : 0);
                let newCol = currentNode.col + (direction === 'left' ? -steps : direction === 'right' ? steps : 0);
                if (newRow < 0 || newRow >= mapLength || newCol < 0 || newCol >= mapWidth) {
                    continue;
                }
                stepsDistance += map[newRow][newCol];
            }
            for (let steps = 4; steps <= 10; steps++) {
                let newRow = currentNode.row + (direction === 'up' ? -steps : direction === 'down' ? steps : 0);
                let newCol = currentNode.col + (direction === 'left' ? -steps : direction === 'right' ? steps : 0);
                if (newRow < 0 || newRow >= mapLength || newCol < 0 || newCol >= mapWidth) {
                    continue;
                }
                stepsDistance += map[newRow][newCol];
                let newDistance = currentNode.distance + stepsDistance;
                let neighbor = queue.find((node) => node.row === newRow && node.col === newCol && node.previousDirection === direction);
                if (neighbor === undefined) {
                    continue;
                }
                if (neighbor.distance > newDistance) {
                    neighbor.distance = newDistance;
                    neighbor.prev = currentNode;
                }
            }
        }
    }
    console.log(endNodes.map((node) => node.distance));
    let h, m, s;
    let totalTime = Date.now() - timeStart;
    h = Math.floor(totalTime / 1000 / 60 / 60);
    m = Math.floor((totalTime / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((totalTime / 1000 / 60 / 60 - h) * 60 - m) * 60);
    console.log(`total time: ${h}:${m}:${s}`);

    // for (let node of endNodes) {
    //     console.log(mapPath(node), node.distance)
    // }

    return Math.min(...endNodes.map((node) => node.distance));
}

function mapPath(node) {
    let path = [];
    while (node.prev !== null) {
        path.unshift(node);
        node = node.prev;
    }
    return path.map((node) => `[${node.row},${node.col}]`).join(',');
}

module.exports = {problemOne, problemTwo};