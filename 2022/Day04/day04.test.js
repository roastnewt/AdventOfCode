const { problemOne, problemTwo } = require('./day04.js');

test('Day04_Problem01', () => {
  expect(problemOne()).toStrictEqual(8153);
});

test('Day04_Problem02', () => {
  expect(problemTwo()).toStrictEqual(2342);
});