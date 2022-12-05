const { problemOne, problemTwo } = require('./day05.js');

test('Day05_Problem01', () => {
  expect(problemOne()).toStrictEqual('TQRFCBSJJ');
});

test('Day05_Problem02', () => {
  expect(problemTwo()).toStrictEqual('RMHFJNVFP');
});