import { type ColumnDef } from '@tanstack/react-table';
import DataTable from './DataTable';
import { useGetReferrals } from '@/features/referrals/hooks/useGetReferrals';
import { useState } from 'react';
import Button from '../ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteReferral } from '@/features/referrals/hooks/useDeleteReferral';
import ConfirmDialog from '../ui/ConfirmDialog';
import type { ReferralType } from '@/features/referrals/types';
import EditReferralFormModal from '../form/EditReferralModalForm';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-handler';

const ReferralsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useGetReferrals({ page, limit });

  const { mutateAsync: deleteReferral, isPending } = useDeleteReferral();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingReferral, setEditingReferral] = useState<ReferralType | null>(null);

  const columns: ColumnDef<ReferralType>[] = [
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingReferral(row.original)}
            className="hover:bg-blue-50 hover:text-blue-700"
            aria-label={`Edit ${row.original.firstName} ${row.original.lastName}`}
          >
            <Pencil size={16} aria-hidden="true" />
          </Button>

          {row.original.id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedId(row.original.id!)}
              className="hover:bg-red-50 hover:text-red-700"
              aria-label={`Delete ${row.original.firstName} ${row.original.lastName}`}
            >
              <Trash2 size={16} aria-hidden="true" />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          page: data?.meta.page ?? 1,
          totalPages: data?.meta.totalPages ?? 1,
          onPageChange: setPage
        }}
        emptyState={{
          title: 'No referrals yet',
          description: 'Create your first referral to get started.'
        }}
      />

      <EditReferralFormModal
        open={!!editingReferral}
        referral={editingReferral!}
        onClose={() => setEditingReferral(null)}
      />

      <ConfirmDialog
        open={!!selectedId}
        title="Delete referral"
        description="Are you sure you want to delete this referral? This action cannot be undone."
        loading={isPending}
        onClose={() => setSelectedId(null)}
        onConfirm={async () => {
          if (selectedId) {
            await deleteReferral(selectedId, {
              onSuccess: () => {
                toast.info('Referral deleted');
                setSelectedId(null);
              },
              onError: (error: Error) => {
                const errorMessage = getErrorMessage(
                  error,
                  'Failed to delete referral. Please try again.'
                );
                toast.error(errorMessage);
              }
            });
          }
        }}
      />
    </>
  );
};

export default ReferralsTable;
