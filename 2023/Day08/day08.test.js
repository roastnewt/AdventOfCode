const { problemOne, problemTwo } = require('./day08.js');

test('Day08_Problem01', () => {
  expect(problemOne()).toStrictEqual(18023);
});

test('Day08_Problem02', () => {
  expect(problemTwo()).toStrictEqual(0);
});