import { type ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 text-center"
      role="status"
      aria-label="Empty state"
    >
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
