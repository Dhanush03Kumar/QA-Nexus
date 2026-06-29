import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const dropdownVariants = cva(
  'inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'border-destructive/50 bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border input-background',
        secondary: 'border-secondary/50 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface DropdownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof dropdownVariants>['variant'];
  className?: string;
}

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <DropdownMenuTrigger asChild>
        <button
          className={dropdownVariants({ variant, className })}
          ref={ref}
          {...props}
        >
          {children}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
    );
  }
);

DropdownButton.displayName = 'DropdownButton';

export { DropdownButton, DropdownMenu, DropdownMenuContent, DropdownMenuItem };