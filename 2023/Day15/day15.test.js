const {problemOne, problemTwo} = require('./day15.js');

test('Day15_Problem01', () => {
    expect(problemOne()).toStrictEqual(519041);
});

test('Day15_Problem02', () => {
    expect(problemTwo()).toStrictEqual(260530);
});