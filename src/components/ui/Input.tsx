import React from 'react';
import { cn } from '../../lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
};

export function Input({
  label,
  error,
  icon,
  iconEnd,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
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
          id={inputId}
          className={cn(
            'w-full h-11 bg-white border rounded-2xl text-gray-800 placeholder-gray-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error
              ? 'border-red-400 focus:ring-red-400'
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
}
