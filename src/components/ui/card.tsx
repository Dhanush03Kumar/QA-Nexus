import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-border border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/50 bg-destructive text-destructive-foreground',
        outline: 'border-input',
        secondary: 'border-secondary/50 bg-secondary/20 text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantProps<typeof cardVariants>['variant'];
  className?: string;
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        className={cardVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };