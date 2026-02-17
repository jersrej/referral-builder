import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';

export const useDeleteReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteReferral'],
    mutationFn: async (id: string) => {
      await http.delete(`/referrals/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    }
  });
};
