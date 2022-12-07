const { problemOne, problemTwo } = require('./day07.js');

test('Day07_Problem01', () => {
  expect(problemOne()).toStrictEqual(1844187);
});

test('Day07_Problem02', () => {
  expect(problemTwo()).toStrictEqual(4978279);
});