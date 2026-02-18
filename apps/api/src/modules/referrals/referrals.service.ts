import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, QueryFailedError, Repository } from 'typeorm';
import { Referral } from './entities/referral.entity';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectRepository(Referral)
    private repo: Repository<Referral>,
  ) {}

  async create(dto: CreateReferralDto) {
    try {
      const referral = this.repo.create({
        ...dto,
        avatarUrl: dto.avatarUrl ?? undefined,
      });
      return this.repo.save(referral);
    } catch (error: any) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === 'ER_DUP_ENTRY'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo.findAndCount({
      where: { deletedAt: IsNull() },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const referral = await this.repo.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!referral) throw new NotFoundException('Referral not found');
    return referral;
  }

  async update(id: string, dto: UpdateReferralDto) {
    const referral = await this.findOne(id);

    // If avatar is being replaced or removed
    if (dto.avatarUrl !== undefined) {
      referral.avatarUrl = dto.avatarUrl ?? undefined;
    }

    Object.assign(referral, dto);

    return this.repo.save(referral);
  }

  async softDelete(id: string) {
    await this.findOne(id);
    await this.repo.softDelete(id);
    return { success: true };
  }
}
