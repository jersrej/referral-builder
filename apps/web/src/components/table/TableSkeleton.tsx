import Skeleton from '@/components/ui/Skeleton';

interface Props {
  rows?: number;
  columns?: number;
}

const TableSkeleton = ({ rows = 3, columns = 4 }: Props) => {
  return (
    <div className="p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 mb-3">
          {Array.from({ length: columns - 1 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
