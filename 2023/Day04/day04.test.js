const { problemOne, problemTwo } = require('./day04.js');

test('Day04_Problem01', () => {
  expect(problemOne()).toStrictEqual(15268);
});

test('Day04_Problem02', () => {
  expect(problemTwo()).toStrictEqual(6283755);
});