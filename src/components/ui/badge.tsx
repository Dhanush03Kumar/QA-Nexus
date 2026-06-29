import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-border border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        destructive: 'border-destructive/50 bg-destructive text-destructive-foreground',
        outline: 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        secondary: 'border-secondary/50 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30',
        success: 'border-success/50 bg-success text-success-foreground hover:bg-success/80',
        warning: 'border-warning/50 bg-warning text-warning-foreground hover:bg-warning/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantProps<typeof badgeVariants>['variant'];
  className?: string;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        className={badgeVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };