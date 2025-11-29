import { cn } from '../../lib/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-gradient-to-r from-beige-100 via-beige-200 to-beige-100 animate-shimmer',
        className
      )}
      style={{ backgroundSize: '200% 100%' }}
      {...props}
    />
  );
}

export { Skeleton };
