import { forwardRef } from 'react';
import type { ReactNode, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconEnd?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, icon, iconEnd, className, id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute start-3 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 bg-white border rounded-2xl text-gray-800 placeholder-gray-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error
              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
              : 'border-gray-200 hover:border-gray-300',
            icon ? 'ps-10' : 'ps-4',
            iconEnd ? 'pe-10' : 'pe-4',
            className
          )}
          {...props}
        />
        {iconEnd && (
          <span className="absolute end-3 text-gray-400 pointer-events-none">
            {iconEnd}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
