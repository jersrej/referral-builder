import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { ReferralType } from '../schema';

interface Params {
  page: number;
  limit: number;
}

export const useGetReferrals = ({ page, limit }: Params) => {
  return useQuery<{ data: ReferralType[]; meta: { page: number; totalPages: number } }>({
    queryKey: ['referrals', { page, limit }],
    queryFn: async () => {
      const res = await http.get('/referrals', {
        params: { page, limit }
      });
      return res.data;
    },
    initialData: { data: [], meta: { page: 1, totalPages: 1 } }
  });
};
