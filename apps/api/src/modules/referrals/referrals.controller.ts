import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReferralsService } from './referrals.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { multerOptions } from '../../config/multer.config';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import type { Request } from 'express';
import { Referral } from './entities/referral.entity';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly service: ReferralsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async create(
    @UploadedFile() file: MulterFile | undefined,
    @Body() dto: CreateReferralDto,
    @Req() req: Request,
  ) {
    if (file?.filename) {
      dto.avatarUrl = `uploads/${file.filename}`;
    }

    const referral = await this.service.create(dto);
    return this.attachAvatarUrl(referral, req);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: MulterFile | undefined,
    @Body() dto: UpdateReferralDto,
  ) {
    if (file) {
      dto.avatarUrl = `uploads/${file.filename}`;
    } else {
      delete dto.avatarUrl;
    }

    if (dto.removeAvatar) {
      dto.avatarUrl = null;
    }

    return this.service.update(id, dto);
  }

  @Get()
  async findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const { page = 1, limit = 10 } = query;

    const result = await this.service.findAll(page, limit);

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // console.log('Base URL:', baseUrl);

    return {
      ...result,
      data: result.data.map((referral) => ({
        ...referral,
        avatarUrl: referral.avatarUrl
          ? `${baseUrl}/${referral.avatarUrl}`
          : null,
      })),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  private attachAvatarUrl(referral: Referral, req: Request): Referral {
    if (!referral?.avatarUrl) return referral;

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    return {
      ...referral,
      avatarUrl: `${baseUrl}/${referral.avatarUrl}`,
    };
  }
}
