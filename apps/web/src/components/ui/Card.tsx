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
    <div className={clsx('bg-white rounded-xl shadow', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b px-4 py-3">
          {title && <h3 className="font-semibold">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
