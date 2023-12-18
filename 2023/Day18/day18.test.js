const {problemOne, problemTwo} = require('./day18.js');

test.skip('Day18_Problem01', () => {
    expect(problemOne()).toStrictEqual(47675);
});

test('Day18_Problem02', () => {
    expect(problemTwo()).toStrictEqual(122103860427465);
});