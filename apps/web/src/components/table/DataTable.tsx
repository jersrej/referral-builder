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
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left text-sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
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
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm whitespace-nowrap">
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
