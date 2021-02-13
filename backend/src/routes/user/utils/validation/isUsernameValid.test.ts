import isUsernameValid from './isUsernameValid';

describe('', () => {
  it('should return true if username is valid', () => {
    const usernameValid = isUsernameValid('username');
    expect(usernameValid).toBeTruthy();
  })

  it('should return false if username is longer than 30 characters', () => {
    const usernameValid = isUsernameValid('usernameusernameusernameusername');
    expect(usernameValid).toBeFalsy();
  })

  it('should return false if username is 0 characters', () => {
    const usernameValid = isUsernameValid('');
    expect(usernameValid).toBeFalsy();
  })
})