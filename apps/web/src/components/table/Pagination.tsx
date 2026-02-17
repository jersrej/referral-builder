import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="gap-1"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="gap-1"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
