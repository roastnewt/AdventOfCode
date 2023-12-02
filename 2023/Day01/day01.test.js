const { problemOne, problemTwo } = require('./day01.js');

test('Day01_Problem01', () => {
  expect(problemOne()).toStrictEqual(56465);
});

test('Day01_Problem02', () => {
  expect(problemTwo()).toStrictEqual(55902);
});