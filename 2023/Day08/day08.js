const {readFileSync} = require('fs');

class Node {
  constructor(name, left, right) {
    this.name = name;
    this.left = left;
    this.right = right;
  }
}

const parseData = (data) => {
  const moves = data[0].split('');
  let nodes = data.slice(2);
  nodes = nodes.map(x => {
    x = x.split(' = ')
    x[1] = x[1].substring(1, x[1].length - 1).split(', ');
    return x;
  });

  let tree = new Map();
  for(let node of nodes) {
    tree.set(node[0], new Node(node[0], node[1][0], node[1][1]));
  }
  return {moves, tree};
}
let problemOne = () => {
  let data = readFileSync('./Day08/input.txt', 'utf-8').split(/\r\n/);
  const {moves, tree} = parseData(data);
  let steps = 0;
  let found = false;
  let currentNode = tree.get('AAA');
  while(!found) {
    for (let move of moves) {
      if (currentNode.name === 'ZZZ') {
        found = true;
        break;
      }
      if (move === 'L') {
        currentNode = tree.get(currentNode.left);
      }
      else {
        currentNode = tree.get(currentNode.right);
      }
      steps++;
    }
  }
  
  return steps;
  
}

let problemTwo = () => {
  const hands = readFileSync('./Day08/input.txt', 'utf-8').split(/\r\n/);
  
}

module.exports = {problemOne, problemTwo};