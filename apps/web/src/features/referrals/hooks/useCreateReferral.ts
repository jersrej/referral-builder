import { http } from '@/lib/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateReferral = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createReferral'],
    mutationFn: async (formData: FormData) => {
      const res = await http.post('/referrals', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    }
  });
};
