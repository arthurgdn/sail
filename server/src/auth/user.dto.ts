export class CreateUserDto {
  readonly tag: string;
  readonly password: string;
  readonly username: string;
}

export class LoginUserDto {
  readonly tag: string;
  readonly password: string;
}
