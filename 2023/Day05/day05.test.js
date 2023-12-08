const { problemOne, problemTwo } = require('./day05.js');

test.skip('Day05_Problem01', () => {
  expect(problemOne()).toStrictEqual(836040384);
});

test.skip('Day05_Problem02', () => {
  expect(problemTwo()).toStrictEqual(10834440);
});