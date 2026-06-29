import * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

const selectTriggerVariants = cva(
  'inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

const selectContentVariants = cva(
  'min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      align: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantProps<typeof selectTriggerVariants>['variant'];
  className?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, variant, children, ...props }, ref) => (
    <DropdownMenuTrigger asChild>
      <div
        className={selectTriggerVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        {children}
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
    </DropdownMenuTrigger>
  )
);
Select.displayName = 'Select';

const SelectValue = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'span'> & { className?: string; placeholder?: string }
>(({ className, placeholder, children, ...props }, ref) => {
  return (
    <span
      className={`flex h-10 w-full items-center justify-between text-sm truncate select-none ${className}`}
      ref={ref}
      {...props}
    >
      {children ?? placeholder}
    </span>
  );
});
SelectValue.displayName = 'SelectValue';

const SelectItem = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <DropdownMenuItem
    className={`
      relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      ${className}
    `}
    ref={ref}
    {...props}
  >
    {children}
  </DropdownMenuItem>
));
SelectItem.displayName = 'SelectItem';

const SelectGroup = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuGroup> & { className?: string; title?: string }
>(({ className, title, children, ...props }, ref) => (
  <DropdownMenuGroup
    className={className}
    ref={ref}
    {...props}
  >
    {title && (
      <DropdownMenuGroup>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
      </DropdownMenuGroup>
    )}
    {children}
  </DropdownMenuGroup>
));
SelectGroup.displayName = 'SelectGroup';

const SelectSeparator = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuSeparator> & { className?: string }
>(({ className, ...props }, ref) => (
  <DropdownMenuSeparator
    className={`-my-1 h-px bg-muted ${className}`}
    ref={ref}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

const SelectContent = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent> & { className?: string; align?: 'start' | 'end' | 'center' }
>(({ className, align = 'start', children, ...props }, ref) => (
  <DropdownMenuContent
    align={align}
    className={selectContentVariants({ align, className })}
    ref={ref}
    {...props}
  />
));
SelectContent.displayName = 'SelectContent';

const SelectLabel = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof DropdownMenuLabel> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <DropdownMenuLabel
    className={`px-2 py-1.5 text-sm font-medium ${className}`}
    ref={ref}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

export {
  Select,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectContent,
  SelectLabel,
};