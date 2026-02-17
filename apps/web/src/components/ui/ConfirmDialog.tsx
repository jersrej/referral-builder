import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading,
  onConfirm,
  onClose
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex gap-3">
        <AlertTriangle className="text-red-500 mt-1" size={20} />
        <div>{description && <p className="text-sm text-gray-600">{description}</p>}</div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
