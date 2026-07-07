import { cn } from '../../lib/utils';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse bg-neutral-200 rounded-xl', className)} />
  );
}
