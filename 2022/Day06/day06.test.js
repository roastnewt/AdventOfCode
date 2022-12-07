const { problemOne, problemTwo } = require('./day06.js');

test('Day06_Problem01', () => {
  expect(problemOne()).toStrictEqual(1356);
});

test('Day06_Problem02', () => {
  expect(problemTwo()).toStrictEqual(2564);
});