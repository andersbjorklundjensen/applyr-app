import Password from './Password';

describe('Password value object tests', () => {
  it('should not allow passwords shorter than 8 characters', () => {
    const passwordResult = Password.create('asdf');

    expect(passwordResult.isFailure).toBeTruthy();
  })

  it('should not allow passwords longer than 30 characters', () => {
    const passwordResult = Password.create('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    expect(passwordResult.isFailure).toBeTruthy();
  })
});