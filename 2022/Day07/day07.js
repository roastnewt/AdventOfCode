const {readFileSync} = require('fs');

function directory(name, files, subdirs, path) {
  this.name = name;
  this.files = files;
  this.subdirs = subdirs;
  this.path = path;
};

function file(name, size) {
  this.name = name;
  this.size = size;
}

let base = new directory("/", {}, {}, ["/"]);

let currentDirectory = null;

let sizes = [];


let buildStructure = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '$ cd /') {
      currentDirectory = base;
      continue;
    }
    if (data[i] === '$ cd ..') {
      let destination = [...currentDirectory.path];
      currentDirectory = base;
      for (let i = 1; i < destination.length - 1; i++) {
        currentDirectory = currentDirectory.subdirs[destination[i]];
      }
      continue;
    }
    if (data[i].startsWith('$ cd ')) {
      currentDirectory = currentDirectory.subdirs[data[i].substring(5)];
      continue;
    }
    if (data[i] === '$ ls') continue;
    if (data[i].startsWith('dir ')) {
      if (!currentDirectory.subdirs[data[i].substring(4)]) {
        currentDirectory.subdirs[data[i].substring(4)] = new directory(data[i].substring(4), {}, {}, [...currentDirectory.path, data[i].substring(4)]);
      }
    } else {
      let space = data[i].indexOf(' ');
      let size = parseInt(data[i].substring(0, space));
      let name = data[i].substring(space+1);
      if (!currentDirectory.files[name]) {
        currentDirectory.files[name] = new file(name, size);
      }
    }
  }
}

let calculateDirectorySizes = (checkingDir) => {
  let size = 0;
  if (checkingDir.files != {}) {
    for (item in checkingDir.files) {
      size += checkingDir.files[item].size;
    }
  }
  if (checkingDir.subdirs === {}) {
    sizes.push({name: checkingDir.name, size: size});
    return size;
  }
  for (subdir in checkingDir.subdirs) {
    size += calculateDirectorySizes(checkingDir.subdirs[subdir]);
  }
  sizes.push({name: checkingDir.name, size: size});
  return size;
}

let problemOne = () => {

  let data = readFileSync('./Day07/input.txt', 'utf-8').split(/\n/);

  base = new directory("/", {}, {}, ["/"]);
  currentDirectory = null;
  sizes = [];


  buildStructure(data);

  calculateDirectorySizes(base);

  let sum = 0;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].size < 100000) {
      sum += sizes[i].size;
    }
  }

  return sum;

}

let problemTwo = () => {

  return null;

}

module.exports = {problemOne, problemTwo};