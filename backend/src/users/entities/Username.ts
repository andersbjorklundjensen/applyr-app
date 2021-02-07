import Result from '../../shared/Result';

export default class Username {
  private username: string;

  private constructor($username: string) {
    this.username = $username;
  }

  private static validate(username: string) {
    if (username.length > 30) return false;
    return true;
  }

  public getUsername() {
    return this.username;
  }

  public static create(username: string): Result<Username> {
    if (!this.validate(username)) return Result.fail('Invalid username');
    return Result.ok(new Username(username));
  }
}
