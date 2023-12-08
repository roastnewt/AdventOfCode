const { problemOne, problemTwo } = require('./day06.js');

test.skip('Day06_Problem01', () => {
  expect(problemOne()).toStrictEqual(220320);
});

test.skip('Day06_Problem02', () => {
  expect(problemTwo()).toStrictEqual(34454850);
});