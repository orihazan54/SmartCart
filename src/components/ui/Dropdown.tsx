import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

type DropdownItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
};

type DropdownProps = {
  items: DropdownItem[];
  onSelect: (key: string) => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  align?: 'start' | 'end';
};

export function Dropdown({
  items,
  onSelect,
  isOpen,
  onClose,
  className,
  align = 'end',
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      role="menu"
      className={cn(
        'absolute top-full mt-1 z-50 min-w-[160px]',
        'bg-white rounded-2xl shadow-lg border border-gray-100 py-1 overflow-hidden',
        align === 'end' ? 'end-0' : 'start-0',
        className
      )}
    >
      {items.map(item => (
        <button
          key={item.key}
          role="menuitem"
          onClick={() => {
            onSelect(item.key);
            onClose();
          }}
          className={cn(
            'w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700',
            'hover:bg-gray-50 active:bg-gray-100 transition-colors text-start'
          )}
        >
          {item.icon && <span className="shrink-0 text-gray-400">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {item.iconEnd && <span className="shrink-0">{item.iconEnd}</span>}
        </button>
      ))}
    </div>
  );
}
