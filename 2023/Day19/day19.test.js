const {problemOne, problemTwo} = require('./day19.js');

test.skip('Day19_Problem01', () => {
    expect(problemOne()).toStrictEqual(456651);
});

test('Day19_Problem02', () => {
    expect(problemTwo()).toStrictEqual(131899818301477);
});