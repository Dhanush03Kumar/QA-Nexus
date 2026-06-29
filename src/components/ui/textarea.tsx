import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  'flex min-h-[20px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
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

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: VariantProps<typeof textareaVariants>['variant'];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={textareaVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };