import { z } from 'zod';

export const referralSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  homeNumber: z.string().min(1, 'Home number is required'),
  street: z.string().min(1, 'Street is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  state: z.string().min(1, 'State is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),
  avatar: z.instanceof(FileList).optional(),
  avatarUrl: z.string().nullable().optional()
});

export type ReferralType = z.infer<typeof referralSchema>;
