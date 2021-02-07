import Result from '../../shared/Result';

export default class Password {
  private password: string;

  private constructor($password: string) {
    this.password = $password;
  }

  private static validate(password: string) {
    if (password.length > 30) return false;
    if (password.length < 8) return false;
    return true;
  }

  public getPassword() {
    return this.password;
  }

  public static create(password: string): Result<Password> {
    if (!this.validate(password)) return Result.fail('Invalid password');
    return Result.ok(new Password(password));
  }
}
