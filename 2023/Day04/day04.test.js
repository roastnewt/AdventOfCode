const { problemOne, problemTwo } = require('./day04.js');

test.skip('Day04_Problem01', () => {
  expect(problemOne()).toStrictEqual(15268);
});

test.skip('Day04_Problem02', () => {
  expect(problemTwo()).toStrictEqual(6283755);
});