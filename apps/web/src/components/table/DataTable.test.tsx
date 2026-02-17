import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { type ColumnDef } from '@tanstack/react-table';
import DataTable from './DataTable';

interface TestRow {
  id: string;
  name: string;
}

const columns: ColumnDef<TestRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  }
];

describe('DataTable', () => {
  it('renders loading state', () => {
    render(<DataTable data={[]} columns={columns} isLoading />);

    // Skeleton renders inside table
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        emptyState={{
          title: 'No records found'
        }}
      />
    );

    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('renders table rows when data is provided', () => {
    render(<DataTable data={[{ id: '1', name: 'John' }]} columns={columns} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('renders pagination when provided', () => {
    render(
      <DataTable
        data={[{ id: '1', name: 'John' }]}
        columns={columns}
        pagination={{
          page: 1,
          totalPages: 3,
          onPageChange: () => {}
        }}
      />
    );

    expect(screen.getByText(/Page 1 of 3/i)).toBeInTheDocument();
  });
});
