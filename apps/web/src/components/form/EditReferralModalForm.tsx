import Modal from '@/components/ui/Modal';
import ReferralForm from './ReferralForm';
import { type ReferralFormValues } from '@/features/referrals/schema';
import { useUpdateReferral } from '@/features/referrals/hooks/useUpdateReferral';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  referral?: ReferralFormValues;
}

const EditReferralFormModal = ({ open, onClose, referral }: Props) => {
  const { mutateAsync: updateReferral, isPending } = useUpdateReferral();

  if (!referral) return null;

  const handleSubmit = async (values: FormData) => {
    if (!referral.id) {
      toast.error('Referral ID is missing. Cannot update referral.');
      return;
    }

    await updateReferral(
      { id: referral?.id, formData: values },
      {
        onSuccess: () => {
          toast.success('Referral updated successfully!');
          onClose();
        },
        onError: () => {
          toast.error('Failed to update referral. Please try again.');
        }
      }
    );
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Referral" size="lg">
      <ReferralForm defaultValues={referral} onSubmit={handleSubmit} isSubmitting={isPending} />
    </Modal>
  );
};

export default EditReferralFormModal;
