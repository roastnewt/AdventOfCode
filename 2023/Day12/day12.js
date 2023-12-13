const {readFileSync} = require('fs');

let problemOne = () => {
    const data = readFileSync('./Day12/input.txt', 'utf-8').split(/\r\n/);
    const lines = [];
    for (let datum of data) {
        const split = datum.split(' ');
        lines.push({record: split[0].split(''), groupSizes: split[1].split(',').map((x) => parseInt(x))})
    }

    function buildPossibilities(record) {
        if (record.length === 0) {
            return [[]];
        }
        const firstChar = record[0];
        if (firstChar === '.' || firstChar === "#") {
            const possibilities = buildPossibilities(record.slice(1));
            for (let possibility of possibilities) {
                possibility.unshift(firstChar);
            }
            return possibilities;
        }
        if (firstChar === '?') {
            const possibilities = buildPossibilities(record.slice(1));
            const newPossibilities = [];
            for (let possibility of possibilities) {
                newPossibilities.push(['#', ...possibility]);
                newPossibilities.push(['.', ...possibility]);
            }
            return newPossibilities;
        }
    }

    function checkPossibilitiy(record, groupSizes) {
        const myGroupSizes = [...groupSizes];
        let lastChar = null;
        for (const char of record) {
            if (char === '#') {
                if (myGroupSizes.length === 0) {
                    return false;
                }
                if (myGroupSizes[0] === 0) {
                    return false;
                }
                if (myGroupSizes[0] > 0) {
                    myGroupSizes[0]--;
                    lastChar = '#';
                }
            } else if (char === '.') {
                if (myGroupSizes.length === 0) {
                    continue;
                }
                if (lastChar === '#' && myGroupSizes[0] > 0) {
                    return false;
                }
                if (lastChar === '#' && myGroupSizes[0] === 0) {
                    lastChar = '.';
                    myGroupSizes.shift();
                }
            }
        }
        return myGroupSizes.length === 0 || (myGroupSizes.length === 1 && myGroupSizes[0] === 0);
    }

    //brute force solution
    let totalValidPossibilities = 0;
    for (let line of lines) {
        const possibilities = buildPossibilities(line.record);
        let validPossibilities = 0;
        for (let possibility of possibilities) {
            let isValid = checkPossibilitiy(possibility, line.groupSizes)
            if (isValid) validPossibilities++;
        }
        totalValidPossibilities += validPossibilities;
    }

    return totalValidPossibilities;
}


let problemTwo = () => {
    const data = readFileSync('./Day12/input.txt', 'utf-8').split(/\r\n/);
    let origLines = [];
    for (let datum of data) {
        const split = datum.split(' ');
        origLines.push({record: split[0].split(''), groupSizes: split[1].split(',').map((x) => parseInt(x))})
    }

    //modify input
    const lines = []
    for (let line of origLines) {
        const modifiedLine = {record: [], groupSizes: []};
        modifiedLine.record = [...line.record, '?', ...line.record, '?', ...line.record, '?', ...line.record, '?', ...line.record];
        modifiedLine.groupSizes = [...line.groupSizes, ...line.groupSizes, ...line.groupSizes, ...line.groupSizes, ...line.groupSizes]
        lines.push(modifiedLine);
    }

    const memo = new Map();

    function findValidPossibilities(record, groupSizes) {
        //console.log(record, groupSizes);
        if (record.length === 0 && groupSizes.length === 0) {
            //console.log('valid end')
            return 1;
        }
        if (record.length === 0 && groupSizes.length > 0) {
            //console.log('ran out of record')
            return 0;
        }
        if (groupSizes.length === 0) {
            for (const element of record) {
                if (element === '#') {
                    //console.log('extra hash with no more groups')
                    return 0;
                }
            }
            return 1;
        }
        if (record.length < groupSizes.reduce((acc, curr) => acc + curr, 0)) {
            //console.log('not enough record left for all groups')
            return 0;
        }
        if (record[0] === '.') {
            if (memo.has(record.slice(1).join(',') + groupSizes.join(','))) {
                return memo.get(record.slice(1).join(',') + groupSizes.join(','));
            } else {
                const result = findValidPossibilities(record.slice(1), groupSizes);
                memo.set(record.slice(1).join(',') + groupSizes.join(','), result);
                return result;
            }
        }
        if (record[0] === '#') {
            const currentGroup = groupSizes[0];
            for (let i = 0; i < currentGroup; i++) {
                if (record[i] === '.') {
                    //console.log('started with hash but hit a dot early')
                    return 0;
                }
            }
            if (record[currentGroup] === '#') {
                //console.log('run ends with extra hash')
                return 0;
            }
            if (memo.has(record.slice(currentGroup + 1).join(',') + groupSizes.slice(1).join(','))) {
                return memo.get(record.slice(currentGroup + 1).join(',') + groupSizes.slice(1).join(','));
            } else {
                const result = findValidPossibilities(record.slice(currentGroup + 1), groupSizes.slice(1));
                memo.set(record.slice(currentGroup + 1).join(',') + groupSizes.slice(1).join(','), result);
                return result;
            }
        }
        let possibility1 = null;
        if (memo.has(['#', ...record.slice(1)].join(',') + groupSizes.join(','))) {
            possibility1 = memo.get(['#', ...record.slice(1)].join(',') + groupSizes.join(','));
        } else {
            possibility1 = findValidPossibilities(['#', ...record.slice(1)], groupSizes);
            memo.set(['#', ...record.slice(1)].join(',') + groupSizes.join(','), possibility1);
        }
        let possibility2 = null;
        if (memo.has(['.', ...record.slice(1)].join(',') + groupSizes.join(','))) {
            possibility2 = memo.get(['.', ...record.slice(1)].join(',') + groupSizes.join(','));
        } else {
            possibility2 = findValidPossibilities(['.', ...record.slice(1)], groupSizes);
            memo.set(['.', ...record.slice(1)].join(',') + groupSizes.join(','), possibility2);
        }
        return possibility1 + possibility2;
    }

    let totalValidPossibilities = 0;
    for (let line of lines) {
        const validPossibilities = findValidPossibilities(line.record, line.groupSizes);
        totalValidPossibilities += validPossibilities;
    }
    return totalValidPossibilities;

}

module.exports = {problemOne, problemTwo};