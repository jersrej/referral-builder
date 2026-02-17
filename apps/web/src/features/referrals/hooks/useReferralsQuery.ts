import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';

interface Params {
  page: number;
  limit: number;
}

export const useReferralsQuery = ({ page, limit }: Params) => {
  return useQuery({
    queryKey: ['referrals', { page, limit }],
    queryFn: async () => {
      const res = await http.get('/referrals', {
        params: { page, limit }
      });
      return res.data;
    }
  });
};
