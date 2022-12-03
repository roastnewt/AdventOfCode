const { problemOne, problemTwo } = require('./day03.js');

test('Day01_Problem01', () => {
  expect(problemOne()).toStrictEqual(8153);
});

test('Day01_Problem02', () => {
  expect(problemTwo()).toStrictEqual(2342);
});