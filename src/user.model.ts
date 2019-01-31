import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class User {
  id?: number;

  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(new RegExp('[0-9]{3}-[0-9]{3}-[0-9]{4}'))
  phoneNumber?: string;

  @IsNotEmpty()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
