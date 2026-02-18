import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from './Pagination';
import TableSkeleton from './TableSkeleton';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  pagination?: PaginationProps;
  emptyState?: {
    title: string;
    description?: string;
  };
}

const DataTable = <T,>({ data, columns, isLoading, pagination, emptyState }: Props<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div>
      <div
        className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm"
        role="region"
        aria-label="Referrals table"
        tabIndex={0}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-linear-to-b from-gray-50 to-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <TableSkeleton columns={columns.length} />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState
                    title={emptyState?.title ?? 'No data'}
                    description={emptyState?.description}
                  />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

export default DataTable;
