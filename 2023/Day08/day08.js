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
  // const data = readFileSync('./Day08/input.txt', 'utf-8').split(/\r\n/);
  // const {moves, tree} = parseData(data);
  // let currentNodes = [];
  // const treeNames = Array.from(tree.keys());
  // treeNames.forEach(key => {
  //   if (key[2] === 'A') {
  //     currentNodes.push(tree.get(key));
  //   }
  // });
  // console.log(currentNodes);
  // let steps = 0;
  // let found = false;
  // while(!found) {
  //   for (let move of moves) {
  //     let hasNonZ = false;
  //     const nextNodes = [];
  //     for (const currentNode of currentNodes) {
  //       if (currentNode.name[2] !== 'Z') {
  //         hasNonZ = true;
  //       }
  //       if (move === 'L') {
  //         nextNodes.push(tree.get(currentNode.left));
  //       } else {
  //         nextNodes.push(tree.get(currentNode.right));
  //       }
  //     }
  //     if (!hasNonZ) {
  //       found = true;
  //       break;
  //     }
  //     steps++;
  //     currentNodes = nextNodes;
  //     console.log(move)
  //     console.log(currentNodes);
  //     if (steps > 1000) {
  //       console.log('too many steps');
  //       return 0;
  //     }
  //   }
  // }
  // return steps;

  const fs = require('node:fs');
  const lcm = require('compute-lcm');
  let answer = 1;
  try {
    const input = fs.readFileSync('./Day08/input.txt', 'utf8');
    const lines = input.split("\r\n");
    const lr = lines[0].trim().split("");
    let camelmap = new Map();
    let locations = [];

    for(i=2;i<lines.length;i++) {
      const bits = lines[i].match(/\w{3}/g);
      camelmap.set(bits[0],[bits[1],bits[2]]);
      if(bits[0].charAt(2) == 'A') locations.push(bits[0]);
    }
    console.log(locations);

    let answers = [];

    locations.forEach((loc) => {
      let i = 0;
      while(true) {
        let offset = i % lr.length;
        let lor = lr[offset];
        loc = (lor == 'L') ? camelmap.get(loc)[0] : camelmap.get(loc)[1];
        i++;
        if(loc.charAt(2) == 'Z') {answers.push(i); break; }
      }
    });
    console.log(answers);
    answer = lcm(answers);
  }
  catch(e) {
    console.error(e);
  }

  return answer
  
}

module.exports = {problemOne, problemTwo};