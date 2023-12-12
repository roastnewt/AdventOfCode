const {problemOne, problemTwo} = require('./day11.js');

test('Day11_Problem01', () => {
    expect(problemOne()).toStrictEqual(10494813);
});

test.skip('Day11_Problem02', () => {
    expect(problemTwo()).toStrictEqual(0);
});