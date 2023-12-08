const { problemOne, problemTwo } = require('./day02.js');

test.skip('Day02_Problem01', () => {
  expect(problemOne()).toStrictEqual(2169);
});

test.skip('Day02_Problem02', () => {
  expect(problemTwo()).toStrictEqual(60948);
});