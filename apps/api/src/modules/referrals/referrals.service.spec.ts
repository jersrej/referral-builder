import { Test, TestingModule } from '@nestjs/testing';
import { ReferralsService } from './referrals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from './entities/referral.entity';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepo = (): MockRepo => ({
  create: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
});

describe('ReferralsService', () => {
  let service: ReferralsService;
  let repo: MockRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferralsService,
        {
          provide: getRepositoryToken(Referral),
          useValue: createMockRepo(),
        },
      ],
    }).compile();

    service = module.get<ReferralsService>(ReferralsService);
    repo = module.get(getRepositoryToken(Referral));
  });

  describe('create', () => {
    it('should create and save a referral', async () => {
      const dto = { firstName: 'John' } as any;
      const created = { id: '1', ...dto };

      repo.create!.mockReturnValue(created);
      repo.save!.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const data = [{ id: '1' }, { id: '2' }];
      const total = 10;

      repo.findAndCount!.mockResolvedValue([data, total]);

      const result = await service.findAll(2, 5);

      expect(repo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 5,
          take: 5,
        }),
      );

      expect(result.meta).toEqual({
        total,
        page: 2,
        limit: 5,
        totalPages: 2,
      });

      expect(result.data).toEqual(data);
    });
  });

  describe('update', () => {
    it('should update a referral', async () => {
      const existing = { id: '1', firstName: 'Old' };

      repo.findOne!.mockResolvedValue(existing);
      repo.update!.mockResolvedValue({ affected: 1 });

      await service.update('1', { firstName: 'Updated' } as any);

      expect(repo.findOne).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalledWith({
        id: '1',
        firstName: 'Updated',
      });
    });

    it('should remove avatar when removeAvatar is true', async () => {
      const referral = {
        id: '1',
        avatarUrl: 'uploads/file.png',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(referral as any);
      jest.spyOn(repo, 'save').mockResolvedValue({
        ...referral,
        avatarUrl: null,
      } as any);

      const result = await service.update('1', {
        removeAvatar: true,
      } as any);

      expect(result.avatarUrl).toBeNull();
    });

    it('should replace avatar when new avatarUrl is provided', async () => {
      const referral = {
        id: '1',
        avatarUrl: 'uploads/old.png',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(referral as any);
      jest.spyOn(repo, 'save').mockResolvedValue({
        ...referral,
        avatarUrl: 'uploads/new.png',
      } as any);

      const result = await service.update('1', {
        avatarUrl: 'uploads/new.png',
      } as any);

      expect(result.avatarUrl).toBe('uploads/new.png');
    });
  });

  describe('softDelete', () => {
    it('should soft delete a referral', async () => {
      const existing = { id: '1' };

      repo.findOne!.mockResolvedValue(existing);
      repo.softDelete!.mockResolvedValue({ affected: 1 });

      await service.softDelete('1');

      expect(repo.findOne).toHaveBeenCalled();
      expect(repo.softDelete).toHaveBeenCalledWith('1');
    });
  });
});
