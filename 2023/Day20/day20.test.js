const {problemOne, problemTwo} = require('./day20.js');

test.skip('Day20_Problem01', () => {
    expect(problemOne()).toStrictEqual(841763884);
});

test('Day20_Problem02', () => {
    expect(problemTwo()).toStrictEqual(0);
});