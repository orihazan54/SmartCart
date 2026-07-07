import { cn } from '../../lib/utils';

type BadgeVariant = 'aisle' | 'category' | 'count';

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  aisle: 'bg-primary-50 text-primary-700 border border-primary-100',
  category: 'bg-neutral-100 text-neutral-600',
  count: 'bg-primary-500 text-white',
};

export function Badge({ variant = 'category', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
