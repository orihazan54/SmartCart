import { ShoppingCart } from 'lucide-react';

type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
  size?: LogoSize;
};

const sizeMap: Record<LogoSize, { wrapper: string; icon: number }> = {
  sm: { wrapper: 'w-10 h-10 rounded-2xl', icon: 20 },
  md: { wrapper: 'w-14 h-14 rounded-3xl', icon: 28 },
  lg: { wrapper: 'w-20 h-20 rounded-4xl', icon: 40 },
};

export function Logo({ size = 'md' }: LogoProps) {
  const { wrapper, icon } = sizeMap[size];
  return (
    <div className={`${wrapper} bg-primary-600 flex items-center justify-center shadow-glow`}>
      <ShoppingCart size={icon} className="text-white" strokeWidth={2} />
    </div>
  );
}
