import isPasswordValid from './isPasswordValid';

describe('', () => {
  it('should return true if password is valid', () => {
    const passwordValid = isPasswordValid('password');
    expect(passwordValid).toBeTruthy();
  })

  it('should return false if password is shorter than 8 characters', () => {
    const passwordValid = isPasswordValid('pass');
    expect(passwordValid).toBeFalsy();
  })
})