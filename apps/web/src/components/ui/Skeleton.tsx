import clsx from 'clsx';

interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => {
  return <div className={clsx('animate-pulse rounded-md bg-gray-200', className)} />;
};

export default Skeleton;
