import { type ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, actions, children, className }: Props) => {
  return (
    <div className={clsx('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
          {title && <h3 className="text-sm font-semibold text-gray-900">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
