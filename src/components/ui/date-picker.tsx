import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const datePickerVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/50 text-destructive destructive:focus-visible:ring-destructive',
        outline: 'border-input hover:bg-accent',
        secondary: 'border-secondary/50 bg-secondary/20 text-secondary-foreground focus-visible:ring-secondary',
        ghost: 'hover:bg-accent',
        link: 'border-transparent text-primary hover:text-primary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof datePickerVariants>['variant'];
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, variant, type = 'date', ...props }, ref) => {
    return (
      <input
        type={type}
        className={datePickerVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };