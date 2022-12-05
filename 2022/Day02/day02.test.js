const { problemOne, problemTwo } = require('./day02.js');

test('Day02_Problem01', () => {
  expect(problemOne()).toStrictEqual(15422);
});

test('Day02_Problem02', () => {
  expect(problemTwo()).toStrictEqual(15442);
});