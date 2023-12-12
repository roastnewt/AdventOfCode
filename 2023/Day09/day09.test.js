const { problemOne, problemTwo } = require('./day09.js');

test.skip('Day09_Problem01', () => {
  expect(problemOne()).toStrictEqual(1898776583);
});

test.skip('Day09_Problem02', () => {
  expect(problemTwo()).toStrictEqual(1100);
});