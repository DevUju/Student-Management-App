import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  role!: UserRole;
}
