import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  'relative h-4 w-4 shrink-0 cursor-pointer border-[2px] border-primary rounded-sm transition-[background-color,border-color] disabled:cursor-not-disabled disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary',
  {
    variants: {
      variant: {
        default: '',
        secondary: 'border-secondary/50 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
        destructive: 'border-destructive/50 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive',
        outline: 'border-input',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof checkboxVariants>['variant'];
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, checked, defaultChecked, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onCheckedChange?.(event.target.checked);
    };

    return (
      <input
        type="checkbox"
        className={checkboxVariants({ variant, className })}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };