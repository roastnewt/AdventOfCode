const {readFileSync} = require('fs');

let buildGrid = (data) => {
  let grid = [];
  for (let i = 0; i < data.length; i++) {
    grid.push([]);
    for (let j = 0; j < data[i].length; j++) {
      grid[i].push({height: parseInt(data[i][j]), visibleUp: null, visibleDown: null, visibleLeft: null, visibleRight: null});
    }
  }
  return grid;
}

let problemOne = () => {

  let data = readFileSync('./Day08/input.txt', 'utf-8').split(/\n/);

  let grid = buildGrid(data);

  // check up
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === 0) {  // mark edges as visible
        grid[i][j].visibleUp = true;
        continue;
      }
      for (let k = i - 1; k >= 0; k--) {
        if (grid[i][j].height > grid[k][j].height && grid[k][j].visibleUp === true) {
          grid[i][j].visibleUp = true;
          break;
        } else if (grid[i][j].height <= grid[k][j].height) {
          grid[i][j].visibleUp = false;
          break;
        }
      }
    }
  }

    // check left
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (j === 0) {  // mark edges as visible
          grid[i][j].visibleLeft = true;
          continue;
        }
        for (let k = j - 1; k >= 0; k--) {
          if (grid[i][j].height > grid[i][k].height && grid[i][k].visibleLeft === true) {
            grid[i][j].visibleLeft = true;
            break;
          } else if (grid[i][j].height <= grid[i][k].height) {
            grid[i][j].visibleLeft = false;
            break;
          }
        }
      }
    }

    // check right
    for (let i = 0; i < grid.length; i++) {
      for (let j = grid[i].length - 1; j >= 0; j--) {
        if (j === grid[i].length - 1) {  // mark edges as visible
          grid[i][j].visibleRight = true;
          continue;
        }
        for (let k = j + 1; k < grid[i].length; k++) {
          if (grid[i][j].height > grid[i][k].height && grid[i][k].visibleRight === true) {
            grid[i][j].visibleRight = true;
            break;
          } else if (grid[i][j].height <= grid[i][k].height) {
            grid[i][j].visibleRight = false;
            break;
          }
        }
      }
    }

    // check down
    for (let i = grid.length - 1; i >= 0; i--) {
      for (let j = 0; j < grid[i].length; j++) {
        if (i === grid.length - 1) {  // mark edges as visible
          grid[i][j].visibleDown = true;
          continue;
        }
        for (let k = i + 1; k < grid.length; k++) {
          if (grid[i][j].height > grid[k][j].height && grid[k][j].visibleDown === true) {
            grid[i][j].visibleDown = true;
            break;
          } else if (grid[i][j].height <= grid[k][j].height) {
            grid[i][j].visibleDown = false;
            break;
          }
        }
      }
    }


    let visible = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].visibleDown || grid[i][j].visibleLeft || grid[i][j].visibleRight || grid[i][j].visibleUp) {
          visible++;
        }
      }
    }

  return visible;

}

let problemTwo = () => {

  let data = readFileSync('./Day08/input.txt', 'utf-8').split(/\n/);

  return null;

}

module.exports = {problemOne, problemTwo};