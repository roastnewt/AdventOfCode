const {problemOne, problemTwo} = require('./day12.js');

test.skip('Day12_Problem01', () => {
    expect(problemOne()).toStrictEqual(7007);
});

test('Day12_Problem02', () => {
    expect(problemTwo()).toStrictEqual(3476169006222);
});