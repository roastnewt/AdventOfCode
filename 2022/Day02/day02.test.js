const { problemOne, problemTwo } = require('./day02.js');

test('Day01_Problem01', () => {
  expect(problemOne()).toStrictEqual(15422);
});

test('Day01_Problem02', () => {
  expect(problemTwo()).toStrictEqual(15442);
});