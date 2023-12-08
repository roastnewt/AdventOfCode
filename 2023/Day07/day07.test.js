const { problemOne, problemTwo } = require('./day07.js');

test.skip('Day07_Problem01', () => {
  expect(problemOne()).toStrictEqual(253205868);
});

test.skip('Day07_Problem02', () => {
  expect(problemTwo()).toStrictEqual(253907829);
});