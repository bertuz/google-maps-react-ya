// @flow
import ThisIsAnImportTest from '../index';

describe('matching cities to foods', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect.assertions(1);
    expect(ThisIsAnImportTest('google-key')).toBe(true);
  });
});
