import { PartialType } from '@nestjs/mapped-types';
import { CreateReferralDto } from './create-referral.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateReferralDto extends PartialType(CreateReferralDto) {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  @IsBoolean()
  removeAvatar?: boolean;
}
