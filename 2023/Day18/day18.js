const {readFileSync} = require('fs');

function shoelaceArea(coordinateList) {
    let area = 0.0;
    let prevVertex = coordinateList.length - 1;
    for (let vertex = 0; vertex < coordinateList.length; vertex++) {
        area += (coordinateList[prevVertex].x + coordinateList[vertex].x) * (coordinateList[prevVertex].y - coordinateList[vertex].y);
        prevVertex = vertex;
    }
    return Math.abs(area / 2.0);
}

function findCoordinatesFromMoves(moves) {
    const holes = [];
    let currentX = 0;
    let currentY = 0;
    let boundaryPoints = 0;
    holes.push({x: 0, y: 0, color: moves[0].color});
    for (const move of moves) {
        if (move.direction === 'R') {
            boundaryPoints += move.distance;
            currentX += move.distance;
        }
        if (move.direction === 'L') {
            boundaryPoints += move.distance;
            currentX -= move.distance;
        }
        if (move.direction === 'U') {
            boundaryPoints += move.distance;
            currentY += move.distance;
        }
        if (move.direction === 'D') {
            boundaryPoints += move.distance;
            currentY -= move.distance;
        }
        holes.push({x: currentX, y: currentY, color: move.color});
    }

    return {boundaryPoints, holes};
}


let problemOne = () => {
    const data = readFileSync('./Day18/input.txt', 'utf-8').split(/\r\n/);
    const moves = [];
    for (let datum of data) {
        let move = datum.split(' ');
        moves.push({direction: move[0], distance: parseInt(move[1]), color: move[2].substring(1, move[2].length - 1)});
    }

    let {boundaryPoints, holes} = findCoordinatesFromMoves(moves);

    // Shoelace formula: returns area of polygon given coordinates of its vertices
    const area = shoelaceArea(holes);
    // Pick's theorem: A = i + (b/2) - 1 gives area of polygon given interior points and boundary points
    // transform to find interior points given area and boundary points
    // i = A - (b/2) + 1
    const interiorPoints = area - (boundaryPoints / 2) + 1;
    // total number of holes is interior points + boundary points
    return interiorPoints + boundaryPoints;
    //47675 correct
}

let problemTwo = () => {
    const data = readFileSync('./Day18/input.txt', 'utf-8').split(/\r\n/);
    const moves = [];
    for (let datum of data) {
        let move = datum.split(' ');
        let colorMoves = move[2].substring(2, move[2].length - 1);
        let colorDistance = parseInt(colorMoves.substring(0, colorMoves.length - 1), 16);
        let direction;
        switch (colorMoves[colorMoves.length - 1]) {
            case '0':
                direction = 'R';
                break;
            case '1':
                direction = 'D';
                break;
            case '2':
                direction = 'L';
                break;
            case '3':
                direction = 'U';
                break;
        }
        moves.push({
            direction: direction,
            distance: colorDistance
        });
    }

    let {boundaryPoints, holes} = findCoordinatesFromMoves(moves);

    const area = shoelaceArea(holes);
    const interiorPoints = area - (boundaryPoints / 2) + 1;
    return interiorPoints + boundaryPoints;
}

module.exports = {problemOne, problemTwo};