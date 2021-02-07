import Result from './Result';

describe('Result class tests', () => {
  it('should give back correct fail message when doing a combined result', () => {
    const result1 = Result.ok<string>('Ok message 2');
    const result2 = Result.fail('Fail message 2');

    const combinedResult = Result.combine([result1, result2]);

    expect(combinedResult.error).toBe('Fail message 2');
  });
});
