import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const selectTriggerVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  variant?: VariantProps<typeof selectTriggerVariants>['variant'];
  className?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, children, onValueChange, onChange, placeholder, value, defaultValue, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event);
      onValueChange?.(event.target.value);
    };

    const shouldShowPlaceholder = placeholder && (value === undefined || value === '' || value === null);

    return (
      <select
        ref={ref}
        className={selectTriggerVariants({ variant, className })}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        {shouldShowPlaceholder ? <option value="">{placeholder}</option> : null}
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

const SelectValue = ({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) => (
  <>{children ?? (placeholder ? <option value="">{placeholder}</option> : null)}</>
);
SelectValue.displayName = 'SelectValue';

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ children, ...props }, ref) => (
    <option ref={ref} {...props}>
      {children}
    </option>
  )
);
SelectItem.displayName = 'SelectItem';

const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectGroup.displayName = 'SelectGroup';

const SelectSeparator = () => null;
SelectSeparator.displayName = 'SelectSeparator';

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectContent.displayName = 'SelectContent';

const SelectLabel = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectLabel.displayName = 'SelectLabel';

const SelectTrigger = Select;

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectContent,
  SelectLabel,
};