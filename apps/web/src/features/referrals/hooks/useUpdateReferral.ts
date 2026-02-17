import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';

export const useUpdateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateReferral'],
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const res = await http.patch(`/referrals/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    }
  });
};
