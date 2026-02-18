import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <nav className="flex items-center justify-between mt-4 px-2" aria-label="Pagination navigation">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="gap-1"
        aria-label="Go to previous page"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-700 font-medium" aria-live="polite" aria-atomic="true">
          Page {page} of {totalPages}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="gap-1"
        aria-label="Go to next page"
      >
        Next
        <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </nav>
  );
};

export default Pagination;
