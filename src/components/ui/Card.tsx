import { cn } from '../../lib/utils';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'gradient';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: CardVariant;
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white border border-gray-100 shadow-sm',
  elevated: 'bg-white border border-gray-100 shadow-lg',
  outlined: 'bg-white border-2 border-primary-200',
  gradient: 'bg-gradient-to-br from-primary-50 to-white border border-primary-100',
};

export function Card({
  padding = 'md',
  variant = 'default',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
