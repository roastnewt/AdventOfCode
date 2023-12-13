const {problemOne, problemTwo} = require('./day13.js');

test('Day13_Problem01', () => {
    expect(problemOne()).toStrictEqual(33728);
});

test.skip('Day13_Problem02', () => {
    expect(problemTwo()).toStrictEqual(0);
});