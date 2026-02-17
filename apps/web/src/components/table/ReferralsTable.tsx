import { type ColumnDef } from '@tanstack/react-table';
import DataTable from './DataTable';
import { useReferralsQuery } from '@/features/referrals/hooks/useReferralsQuery';
import { useState } from 'react';
import Button from '../ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteReferral } from '@/features/referrals/hooks/useDeleteReferral';
import ConfirmDialog from '../ui/ConfirmDialog';
import type { ReferralFormValues } from '@/features/referrals/schema';
import EditReferralFormModal from '../form/EditReferralModalForm';
import { toast } from 'sonner';

const ReferralsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading } = useReferralsQuery({ page, limit });

  const { mutateAsync: deleteReferral, isPending } = useDeleteReferral();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingReferral, setEditingReferral] = useState<ReferralFormValues | null>(null);

  const columns: ColumnDef<ReferralFormValues>[] = [
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEditingReferral(row.original)}>
            <Pencil size={16} />
          </Button>

          {row.original.id && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedId(row.original.id!)}>
              <Trash2 size={16} className="text-red-500" />
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
        description="This action cannot be undone."
        loading={isPending}
        onClose={() => setSelectedId(null)}
        onConfirm={async () => {
          if (selectedId) {
            await deleteReferral(selectedId, {
              onSuccess: () => {
                toast.info('Referral deleted');
                setSelectedId(null);
              }
            });
          }
        }}
      />
    </>
  );
};

export default ReferralsTable;
