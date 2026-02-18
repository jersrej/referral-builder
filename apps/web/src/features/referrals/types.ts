import type z from 'zod';
import type { referralSchema } from './schema';

export type ReferralType = z.infer<typeof referralSchema>;
