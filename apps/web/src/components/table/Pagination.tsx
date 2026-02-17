import Button from '@/components/ui/Button';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
