const { problemOne, problemTwo } = require('./day03.js');

test.skip('Day03_Problem01', () => {
  expect(problemOne()).toStrictEqual(535078);
});

test.skip('Day03_Problem02', () => {
  expect(problemTwo()).toStrictEqual(75312571);
});