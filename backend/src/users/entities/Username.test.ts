import Username from './Username';

describe('Username value object tests', () => {
  it('should not allow usernames longer than 30 characters', () => {
    const usernameResult = Username.create('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    expect(usernameResult.isFailure).toBeTruthy();
  });
});
