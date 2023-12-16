const {readFileSync} = require('fs');

function move(row, col, direction) {
    switch (direction) {
        case 'right':
            col++;
            break;
        case 'left':
            col--;
            break;
        case 'up':
            row--;
            break;
        case 'down':
            row++;
            break;
    }
    return [row, col];
}

function calculateEnergy(grid, startRow, startCol, startDirection) {
    const alreadyTraversed = new Set();
    const queue = [];
    queue.push([startRow, startCol, startDirection]);
    grid = JSON.parse(JSON.stringify(grid));

    while (queue.length > 0) {
        let [row, col, direction] = queue.shift();
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
            continue;
        }
        if (alreadyTraversed.has(`${row},${col},${direction}`)) {
            continue;
        }
        alreadyTraversed.add(`${row},${col},${direction}`);
        grid[row][col].energized = true;

        if (grid[row][col].char === '.') {
            let [newRow, newCol] = move(row, col, direction);
            queue.push([newRow, newCol, direction]);
            continue;
        }
        if (grid[row][col].char === '/') {
            if (direction === 'right') {
                let [newRow, newCol] = move(row, col, 'up');
                queue.push([newRow, newCol, 'up']);
                continue;
            }
            if (direction === 'left') {
                let [newRow, newCol] = move(row, col, 'down');
                queue.push([newRow, newCol, 'down']);
                continue;
            }
            if (direction === 'up') {
                let [newRow, newCol] = move(row, col, 'right');
                queue.push([newRow, newCol, 'right']);
                continue;
            }
            if (direction === 'down') {
                let [newRow, newCol] = move(row, col, 'left');
                queue.push([newRow, newCol, 'left']);
                continue;
            }
        }
        if (grid[row][col].char === '\\') {
            if (direction === 'right') {
                let [newRow, newCol] = move(row, col, 'down');
                queue.push([newRow, newCol, 'down']);
                continue;
            }
            if (direction === 'left') {
                let [newRow, newCol] = move(row, col, 'up');
                queue.push([newRow, newCol, 'up']);
                continue;
            }
            if (direction === 'up') {
                let [newRow, newCol] = move(row, col, 'left');
                queue.push([newRow, newCol, 'left']);
                continue;
            }
            if (direction === 'down') {
                let [newRow, newCol] = move(row, col, 'right');
                queue.push([newRow, newCol, 'right']);
                continue;
            }
        }
        if (grid[row][col].char === '-') {
            if (direction === 'up' || direction === 'down') {
                let [newRow, newCol] = move(row, col, 'left');
                queue.push([newRow, newCol, 'left']);
                [newRow, newCol] = move(row, col, 'right');
                queue.push([newRow, newCol, 'right']);
                continue;
            }
            if (direction === 'left' || direction === 'right') {
                let [newRow, newCol] = move(row, col, direction);
                queue.push([newRow, newCol, direction]);
                continue;
            }
        }
        if (grid[row][col].char === '|') {
            if (direction === 'left' || direction === 'right') {
                let [newRow, newCol] = move(row, col, 'up');
                queue.push([newRow, newCol, 'up']);
                [newRow, newCol] = move(row, col, 'down');
                queue.push([newRow, newCol, 'down']);
                continue;
            }
            if (direction === 'up' || direction === 'down') {
                let [newRow, newCol] = move(row, col, direction);
                queue.push([newRow, newCol, direction]);
            }
        }
    }

    let total = 0;
    for (let row of grid) {
        for (let col of row) {
            if (col.energized) {
                total++;
            }
        }
    }

    return total;
}

let problemOne = () => {
    const data = readFileSync('./Day16/input.txt', 'utf-8').split(/\n/);
    const grid = [];
    for (let i = 0; i < data.length; i++) {
        grid[i] = [];
        for (let j = 0; j < data[i].length; j++) {
            grid[i].push({char: data[i][j], energized: false});
        }
    }

    return calculateEnergy(grid, 0, 0, 'right');
}

let problemTwo = () => {
    const data = readFileSync('./Day16/input.txt', 'utf-8').split(/\n/);
    const grid = [];
    for (let i = 0; i < data.length; i++) {
        grid[i] = [];
        for (let j = 0; j < data[i].length; j++) {
            grid[i].push({char: data[i][j], energized: false});
        }
    }

    let maximum = 0;
    for (let row = 0; row < grid.length; row++) {
        let energy = calculateEnergy(grid, row, 0, 'right');
        maximum = Math.max(maximum, energy);
        let energy2 = calculateEnergy(grid, row, grid.length - 1, 'left');
        maximum = Math.max(maximum, energy2);
    }
    for (let col = 0; col < grid[0].length; col++) {
        let energy = calculateEnergy(grid, 0, col, 'down');
        maximum = Math.max(maximum, energy);
        let energy2 = calculateEnergy(grid, grid.length - 1, col, 'up');
        maximum = Math.max(maximum, energy2);
    }

    return maximum;
    //11321 too high

}

module.exports = {problemOne, problemTwo};