const { problemOne, problemTwo } = require('./day01.js');

test('Day01_Problem01', () => {
  expect(problemOne()).toStrictEqual(72240);
});

test('Day01_Problem02', () => {
  expect(problemTwo()).toStrictEqual(210957);
});