import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateReferralDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  homeNumber: string;

  @IsString()
  street: string;

  @IsString()
  suburb: string;

  @IsString()
  state: string;

  @IsString()
  postcode: string;

  @IsString()
  country: string;

  @Column({ nullable: true })
  avatarUrl?: string | null;
}
