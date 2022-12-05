const { problemOne, problemTwo } = require('./day03.js');

test('Day03_Problem01', () => {
  expect(problemOne()).toStrictEqual(8153);
});

test('Day03_Problem02', () => {
  expect(problemTwo()).toStrictEqual(2342);
});